import {
  Box,
  BoxProps,
  Factory,
  StylesApiProps,
  createVarsResolver,
  factory,
  useProps,
  useStyles,
} from '@mantine/core';
import React from 'react';
import { SplitPane } from './Pane/SplitPane';
import { SplitPaneResizerSharedProps, SplitPaneResizerVariant } from './Resizer/SplitPaneResizer';
import { SplitContextProvider } from './Split.context';
import classes from './Split.module.css';

export type SplitStylesNames = 'root';

export type SplitVariant = SplitPaneResizerVariant;

export type SplitCssVariables = {
  root: '--split-inline';
};

export interface SplitBaseProps extends SplitPaneResizerSharedProps {
  /** Make main split container inline */
  inline?: boolean;

  /** Split children */
  children?: React.ReactNode;
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
  };
}>;

const defaultProps: Partial<SplitProps> = {
  inline: false,
  orientation: 'vertical',
  size: 'sm',
  variant: 'default',
};

const varsResolver = createVarsResolver<SplitFactory>((_, { inline }) => ({
  root: {
    '--split-inline': inline ? 'inline-flex' : 'flex',
  },
}));

export const Split = factory<SplitFactory>((_props, ref) => {
  const props = useProps('Split', defaultProps, _props);
  const {
    orientation,
    inline,

    size,
    radius,
    color,
    hoverColor,
    opacity,

    withKnob,
    knobAlwaysOn,
    knobSize,
    knobOpacity,
    knobRadius,
    knobColor,
    knobHoverColor,
    variant,
    spacing,

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

  const childrenArray = React.Children.toArray(children);

  const content = childrenArray.map((child, index) => {
    const withResizer = index < childrenArray.length - 1;

    return React.cloneElement(child as JSX.Element, {
      key: `pane-${index}`,
      withResizer,
    });
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
        variant,
        withKnob,
        knobAlwaysOn,
        spacing,
      }}
    >
      <Box ref={ref} mod={{ orientation }} {...getStyles('root')} {...others}>
        {content}
      </Box>
    </SplitContextProvider>
  );
});

Split.classes = classes;
Split.displayName = 'Split';
Split.Pane = SplitPane;
