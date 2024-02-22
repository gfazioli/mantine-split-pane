import {
  Box,
  BoxProps,
  Factory,
  MantineColor,
  MantineSize,
  StylesApiProps,
  factory,
  useProps,
  useStyles,
} from '@mantine/core';
import React from 'react';
import { SplitPaneResizer } from '../Resizer/SplitPaneResizer';
import { useSplitContext } from '../Split.context';
import classes from './SplitPane.module.css';

export type SplitPaneStylesNames = 'pane';

export interface SplitPaneProps extends BoxProps, StylesApiProps<SplitPaneFactory> {
  /** Split pane content */
  children: React.ReactNode;

  /** Resizer size */
  size?: MantineSize | number | (string & {});

  /** Grow pane to fill available space */
  grow?: boolean;

  /** Key of `theme.colors` or any valid CSS color value, by default value depends on color scheme */
  color?: MantineColor;

  /** Highlight color on hover */
  hoverColor?: MantineColor;

  /** Initial width of the pane */
  initialWidth?: number | string;

  /** Initial height of the pane */
  initialHeight?: number | string;

  /** The minimum width of the pane when mode is vertical */
  minWidth?: number;

  /** The minimum height of the pane when mode is horizontal */
  minHeight?: number;

  /** The maximum width of the pane when mode is vertical */
  maxWidth?: number;

  /** The maximum height of the pane when mode is horizontal */
  maxHeight?: number;

  /** Usually you won't need to use this prop directly, it's used internally by Split component */
  withResizer?: boolean;

  /** Event called when pane size changes */
  onPaneResize?: (width: string, height: string) => void;
}

export type SplitPaneFactory = Factory<{
  props: SplitPaneProps;
  ref: HTMLDivElement;
  stylesNames: SplitPaneStylesNames;
  //vars: SplitPaneCssVariables;
  //defaultComponent: 'div';
  //variant: SplitPaneResizerVariant;
}>;

const defaultProps: Partial<SplitPaneProps> = {
  withResizer: true,
  minWidth: 20,
  minHeight: 20,
  initialWidth: 'auto',
  grow: false,
};

export const SplitPane = factory<SplitPaneFactory>((_props, ref) => {
  const props = useProps('Pane', defaultProps, _props);

  const {
    children,
    withResizer,
    size,
    grow,
    color,
    hoverColor,
    initialWidth,
    initialHeight,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    onPaneResize,

    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    mod,
    ...others
  } = props;

  const {
    mode,
    size: sizeContext,
    color: colorContext,
    hoverColor: hoverColorContext,
  } = useSplitContext();

  const paneRef = React.useRef<HTMLDivElement>(null);

  const getStyles = useStyles<SplitPaneFactory>({
    name: 'SplitPane',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    //varsResolver,
  });

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (mode === 'vertical') {
      paneRef.current.style.width =
        typeof initialWidth === 'number' ? `${initialWidth}px` : initialWidth;
    }

    if (mode === 'horizontal') {
      paneRef.current.style.height =
        typeof initialHeight === 'number' ? `${initialHeight}px` : initialHeight;
    }
  };

  return (
    <Box
      ref={paneRef}
      w={mode === 'vertical' ? initialWidth : undefined}
      h={mode === 'horizontal' ? initialHeight : undefined}
      mod={{ mode: mode }}
      {...getStyles('pane')}
      style={{ flex: grow ? 1 : 'initial' }}
      {...others}
    >
      {children}
      {withResizer && (
        <SplitPaneResizer
          onPaneResize={onPaneResize}
          onDoubleClick={handleDoubleClick}
          paneRef={paneRef}
          size={size || sizeContext}
          color={color || colorContext}
          hoverColor={hoverColor || hoverColorContext}
          minWidth={minWidth}
          minHeight={minHeight}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          mode={mode}
        />
      )}
    </Box>
  );
});

SplitPane.classes = classes;
SplitPane.displayName = 'SplitPane';
