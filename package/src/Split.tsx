import React, { cloneElement, isValidElement, useRef } from 'react';
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

export type SplitVariant = SplitResizerVariant;

export type SplitCssVariables = {
  root: '--split-inline';
};

export interface SplitBaseProps extends SplitResizerContextProps {
  /** Make main split container inline */
  inline?: boolean;

  /** Automatically insert resizers between panes when not explicitly provided */
  autoResizers?: boolean;

  /** Split children */
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

  const childRefs = React.Children.map(children, () => useRef<HTMLDivElement>(null));

  let clonedChildren: React.ReactNode[] = React.Children.map(
    children,
    (child: ChildrenType, index) => {
      if (isValidElement(child)) {
        if (child.type === SplitResizer) {
          const beforeRef = childRefs[index - 1];
          const afterRef = childRefs[index + 1];

          return cloneElement(child as React.ReactElement<SplitResizerProps>, {
            __beforeRef: beforeRef,
            __afterRef: afterRef,
          });
        } else if (child.type === SplitPane) {
          {
            return cloneElement(child as React.ReactElement<SplitPaneProps>, {
              ref: childRefs[index],
            });
          }
        } else {
          return child;
        }
      }
      return child;
    }
  );

  // Auto-insert resizers between panes
  if (autoResizers) {
    const elementsWithResizers: React.ReactNode[] = [];
    let resizerIndex = 0;
    const childrenArray = React.Children.toArray(clonedChildren);

    childrenArray.forEach((child, index) => {
      if (isValidElement(child) && child.type === SplitPane) {
        // Add pane
        elementsWithResizers.push(child);

        // Add resizer after pane (except for last pane)
        if (index < childrenArray.length - 1) {
          const nextChild = childrenArray[index + 1];
          // Only add if next child is also a pane (not already a resizer)
          if (isValidElement(nextChild) && nextChild.type === SplitPane) {
            const beforeRef = childRefs[elementsWithResizers.length - 1];
            const afterRef = childRefs[index + 1];

            elementsWithResizers.push(
              <SplitResizer
                key={`auto-resizer-${resizerIndex++}`}
                __beforeRef={beforeRef}
                __afterRef={afterRef}
              />
            );
          }
        }
      } else {
        // Keep existing resizers or other elements
        elementsWithResizers.push(child);
      }
    });

    clonedChildren = elementsWithResizers;
  }

  return (
    <SplitContextProvider
      value={{
        orientation,
        size,
        opacity,
        radius,
        color,
        hoverColor,
        knobSize,
        knobOpacity,
        knobRadius,
        knobColor,
        knobHoverColor,
        variant: variant as SplitResizerVariant,
        withKnob,
        knobAlwaysOn,
        spacing,
        step,
        shiftStep,
        cursorVertical,
        cursorHorizontal,
        gradient,
        hoverGradient,
      }}
    >
      <Box ref={ref} mod={{ orientation }} {...getStyles('root')} {...others}>
        {clonedChildren}
      </Box>
    </SplitContextProvider>
  );
});

Split.classes = classes;
Split.displayName = 'Split';
Split.Pane = SplitPane;
Split.Resizer = SplitResizer;
