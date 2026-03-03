import React, { cloneElement, isValidElement, useMemo, useState } from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  Factory,
  factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';
import { SplitDynamic } from './Dynamic';
import { useResponsiveValue } from './hooks/use-responsive-value';
import { useSplitResizerOrientation } from './hooks/use-split-resizer-orientation';
import { SplitPane, type SplitPaneProps } from './Pane/SplitPane';
import {
  defaultProps as splitPaneResizerDefaultProps,
  SplitResizer,
  type SplitResizerContextProps,
  type SplitResizerProps,
  type SplitResizerVariant,
} from './Resizer/SplitResizer';
import { SplitContextProvider } from './Split.context';
import classes from './Split.module.css';

export type SplitStylesNames = 'root';

/** Variant type for `Split`, mirrors `SplitResizerVariant` */
export type SplitVariant = SplitResizerVariant;

export type SplitCssVariables = {
  root: '--split-inline';
};

/**
 * Base props for the `Split` container. Extends `SplitResizerContextProps` so
 * that resizer configuration (variant, color, knob, etc.) set on `<Split>` is
 * automatically cascaded to all child `<Split.Resizer>` components via context.
 */
export interface SplitBaseProps extends SplitResizerContextProps {
  /** Render the split container as `inline-flex` instead of `flex` */
  inline?: boolean;

  /**
   * When `true`, `Split.Resizer` components are automatically inserted between
   * consecutive `Split.Pane` children, removing the need to add them manually.
   * Auto-inserted resizers inherit all resizer props from the parent `Split`.
   */
  autoResizers?: boolean;

  /** Split children — typically `Split.Pane` and `Split.Resizer` elements */
  children: React.ReactNode;
}

export interface SplitProps extends BoxProps, SplitBaseProps, StylesApiProps<SplitFactory> {}

export type SplitFactory = Factory<{
  props: SplitProps;
  defaultComponent: 'div';
  ref: HTMLDivElement;
  stylesNames: SplitStylesNames;
  vars: SplitCssVariables;
  variant: SplitVariant;
  staticComponents: {
    Pane: typeof SplitPane;
    Resizer: typeof SplitResizer;
    Dynamic: typeof SplitDynamic;
  };
}>;

const defaultProps: Partial<SplitProps> = {
  inline: false,
  autoResizers: false,
  ...splitPaneResizerDefaultProps,
};

const varsResolver = createVarsResolver<SplitFactory>((_, { inline }) => ({
  root: {
    '--split-inline': inline ? 'inline-flex' : 'flex',
  },
}));

export const Split = factory<SplitFactory>((_props, ref) => {
  const props = useProps('Split', defaultProps, _props);
  const {
    inline,
    autoResizers,

    orientation: propOrientation,
    opacity,
    size,
    radius,
    withKnob,
    knobAlwaysOn,
    knobSize,
    knobOpacity,
    knobRadius,
    knobColor,
    knobHoverColor,
    spacing,
    step,
    shiftStep,
    cursorVertical,
    cursorHorizontal,
    color,
    hoverColor,
    variant,
    gradient,
    hoverGradient,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    mod,
    children,
    className,
    ...others
  } = props;

  const orientation = useSplitResizerOrientation(propOrientation);

  // Resolve responsive resizer props to scalars before passing to context
  const resolvedSize = useResponsiveValue(size);
  const resolvedSpacing = useResponsiveValue(spacing);
  const resolvedKnobSize = useResponsiveValue(knobSize);

  const [resizeObserverRef, containerRect] = useResizeObserver();
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Update containerSize when the ResizeObserver reports a change
  React.useEffect(() => {
    if (containerRect.width > 0 || containerRect.height > 0) {
      setContainerSize({ width: containerRect.width, height: containerRect.height });
    }
  }, [containerRect.width, containerRect.height]);

  // Merge the external forwarded ref with the ResizeObserver ref
  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      resizeObserverRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref, resizeObserverRef]
  );

  const getStyles = useStyles<SplitFactory>({
    name: 'Split',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  type ChildrenType = React.ReactElement<SplitPaneProps> | React.ReactElement<SplitResizerProps>;

  // Create refs based on children count using useMemo to avoid hook count mismatch
  const childrenCount = React.Children.count(children);
  const childRefs = useMemo(
    () => Array.from({ length: childrenCount }, () => React.createRef<HTMLDivElement>()),
    [childrenCount]
  );

  let clonedChildren: React.ReactNode[];

  // Auto-insert resizers between panes
  if (autoResizers) {
    const elementsWithResizers: React.ReactNode[] = [];
    let resizerIndex = 0;
    let paneIndex = 0;
    const paneRefs: Array<React.RefObject<HTMLDivElement>> = [];

    // First pass: collect only panes and assign refs
    React.Children.forEach(children, (child: ChildrenType, index) => {
      if (isValidElement(child) && child.type === SplitPane) {
        const ref = childRefs[index];
        paneRefs.push(ref);

        elementsWithResizers.push(
          cloneElement(child as React.ReactElement<SplitPaneProps>, {
            key: child.key || `pane-${paneIndex}`,
            ref,
          })
        );

        paneIndex++;
      }
    });

    // Second pass: insert resizers between panes
    const finalElements: React.ReactNode[] = [];
    elementsWithResizers.forEach((pane, index) => {
      finalElements.push(pane);

      // Add resizer after each pane except the last one
      if (index < elementsWithResizers.length - 1) {
        const beforeRef = paneRefs[index];
        const afterRef = paneRefs[index + 1];

        finalElements.push(
          <SplitResizer
            key={`auto-resizer-${resizerIndex++}`}
            __beforeRef={beforeRef}
            __afterRef={afterRef}
          />
        );
      }
    });

    clonedChildren = finalElements;
  } else {
    // Normal mode: manual resizers
    clonedChildren = React.Children.map(children, (child: ChildrenType, index) => {
      if (isValidElement(child)) {
        if (child.type === SplitResizer) {
          const beforeRef = childRefs[index - 1];
          const afterRef = childRefs[index + 1];

          return cloneElement(child as React.ReactElement<SplitResizerProps>, {
            __beforeRef: beforeRef,
            __afterRef: afterRef,
          });
        } else if (child.type === SplitPane) {
          return cloneElement(child as React.ReactElement<SplitPaneProps>, {
            ref: childRefs[index],
          });
        }
        return child;
      }
      return child;
    });
  }

  return (
    <SplitContextProvider
      value={{
        orientation,
        size: resolvedSize,
        opacity,
        radius,
        color,
        hoverColor,
        knobSize: resolvedKnobSize,
        knobOpacity,
        knobRadius,
        knobColor,
        knobHoverColor,
        variant: variant as SplitResizerVariant,
        withKnob,
        knobAlwaysOn,
        spacing: resolvedSpacing,
        step,
        shiftStep,
        cursorVertical,
        cursorHorizontal,
        gradient,
        hoverGradient,
        containerSize,
      }}
    >
      <Box ref={mergedRef} mod={{ orientation }} {...getStyles('root')} {...others}>
        {clonedChildren}
      </Box>
    </SplitContextProvider>
  );
});

Split.classes = classes;
Split.displayName = 'Split';
Split.Pane = SplitPane;
Split.Resizer = SplitResizer;
Split.Dynamic = SplitDynamic;
