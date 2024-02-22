import {
  Box,
  BoxProps,
  Factory,
  MantineColor,
  MantineSize,
  StylesApiProps,
  createVarsResolver,
  factory,
  useProps,
  useStyles,
} from '@mantine/core';
import React from 'react';
import { SplitPane } from './Pane/SplitPane';
import { SplitContextProvider } from './Split.context';
import classes from './Split.module.css';

export type SplitStylesNames = 'root' | 'resizer';

export type SplitCssVariables = {
  root: '--split-fluid';
};

export interface SplitBaseProps {
  /** Split mode */
  mode?: 'horizontal' | 'vertical';

  /** Key of `theme.colors` or any valid CSS color value, by default value depends on color scheme */
  color?: MantineColor;

  /** Highlight color on hover */
  hoverColor?: MantineColor;

  /** Resizer size */
  size?: MantineSize | number | (string & {});

  fluid?: boolean;

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
  staticComponents: {
    Pane: typeof SplitPane;
  };
}>;

const defaultProps: Partial<SplitProps> = {
  fluid: false,
  mode: 'vertical',
  size: 'xs',
};

const varsResolver = createVarsResolver<SplitFactory>((_, { fluid }) => ({
  root: {
    '--split-fluid': fluid ? 'flex' : 'inline-flex',
  },
}));

export const Split = factory<SplitFactory>((_props, ref) => {
  const props = useProps('Split', defaultProps, _props);
  const {
    mode,
    fluid,
    size,
    color,
    hoverColor,

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

  return (
    <SplitContextProvider
      value={{
        mode,
        size,
        color,
        hoverColor,
      }}
    >
      <Box ref={ref} mod={{ mode: mode }} {...getStyles('root')} {...others}>
        {childrenArray.map((child, index) => {
          return React.cloneElement(child as JSX.Element, {
            key: `pane-${index}`,
            withResizer: index < childrenArray.length - 1,
          });
        })}
      </Box>
    </SplitContextProvider>
  );
});

Split.classes = classes;
Split.displayName = 'Split';
Split.Pane = SplitPane;
