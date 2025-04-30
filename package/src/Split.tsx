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
import { SplitPane, type SplitPaneProps } from './Pane/SplitPane';
import {
  SplitPaneResizer,
  defaultProps as splitPaneResizerDefaultProps,
  type SplitPaneResizerContextProps,
  type SplitPaneResizerProps,
  type SplitPaneResizerVariant,
} from './Resizer/SplitPaneResizer';
import { SplitContextProvider } from './Split.context';
import classes from './Split.module.css';

export type SplitStylesNames = 'root';

export type SplitVariant = SplitPaneResizerVariant;

export type SplitCssVariables = {
  root: '--split-inline';
};

export interface SplitBaseProps extends SplitPaneResizerContextProps {
  /** Make main split container inline */
  inline?: boolean;

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
    Resizer: typeof SplitPaneResizer;
  };
}>;

const defaultProps: Partial<SplitProps> = {
  inline: false,
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

    orientation,
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

  type ChildrenType =
    | React.ReactElement<SplitPaneProps>
    | React.ReactElement<SplitPaneResizerProps>;

  const childRefs = React.Children.map(children, () => useRef<HTMLDivElement>(null));

  const clonedChildren = React.Children.map(children, (child: ChildrenType, index) => {
    if (isValidElement(child)) {
      if (child.type === SplitPaneResizer) {
        const beforeRef = childRefs[index - 1];
        const afterRef = childRefs[index + 1];

        return cloneElement(child as React.ReactElement<SplitPaneResizerProps>, {
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
  });

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
        variant: variant as SplitPaneResizerVariant,
        withKnob,
        knobAlwaysOn,
        spacing,
        step,
        shiftStep,
        cursorVertical,
        cursorHorizontal,
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
Split.Resizer = SplitPaneResizer;
