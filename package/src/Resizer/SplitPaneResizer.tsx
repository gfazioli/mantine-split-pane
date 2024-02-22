import {
  Box,
  BoxProps,
  Factory,
  MantineColor,
  MantineSize,
  StylesApiProps,
  createVarsResolver,
  factory,
  getSize,
  getThemeColor,
  useProps,
  useStyles,
} from '@mantine/core';
import React, { MutableRefObject, useRef } from 'react';
import classes from './SplitPaneResizer.module.css';

export type SplitPaneResizerStylesNames = 'resizer';

export type SplitPaneResizerCssVariables = {
  resizer: '--resizer-size' | '--resizer-color' | '--resizer-hover-color';
};

export interface SplitPaneResizerProps extends BoxProps, StylesApiProps<SplitPaneResizerFactory> {
  /** Split mode */
  mode: 'horizontal' | 'vertical';

  /** Key of `theme.colors` or any valid CSS color value, by default value depends on color scheme */
  color?: MantineColor;

  /** Highlight color on hover */
  hoverColor?: MantineColor;

  /** Resizer size */
  size?: MantineSize | number | (string & {});

  /** The minimum width of the pane when mode is vertical */
  minWidth?: number;

  /** The minimum height of the pane when mode is horizontal */
  minHeight?: number;

  /** The maximum width of the pane when mode is vertical */
  maxWidth?: number;

  /** The maximum height of the pane when mode is horizontal */
  maxHeight?: number;

  /** Event called when resizer is double clicked */
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /** Event called when pane size changes */
  onPaneResize?: (width: string, height: string) => void;

  /** The pane ref */
  paneRef: MutableRefObject<HTMLDivElement | null>;
}

export type SplitPaneResizerFactory = Factory<{
  props: SplitPaneResizerProps;
  ref: HTMLDivElement;
  stylesNames: SplitPaneResizerStylesNames;
  vars: SplitPaneResizerCssVariables;
  //defaultComponent: 'div';
  //variant: SplitPaneResizerVariant;
}>;

const varsResolver = createVarsResolver<SplitPaneResizerFactory>(
  (theme, { color, hoverColor, size }) => ({
    resizer: {
      '--resizer-color': color ? getThemeColor(color, theme) : undefined,
      '--resizer-hover-color': hoverColor ? getThemeColor(hoverColor, theme) : undefined,
      '--resizer-size': getSize(size, 'resizer-size'),
    },
  })
);

const defaultProps: Partial<SplitPaneResizerProps> = {};

export const SplitPaneResizer = factory<SplitPaneResizerFactory>((_props, ref) => {
  const props = useProps('Resizer', defaultProps, _props);

  const {
    size,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    mode,
    color,
    hoverColor,
    onPaneResize,
    paneRef,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    mod,
    ...others
  } = props;

  const getStyles = useStyles<SplitPaneResizerFactory>({
    name: 'SplitPaneResizer',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const containerRef = useRef(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'col-resize';
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!paneRef.current) return;

    if (mode === 'vertical') {
      const delta = event.clientX - paneRef.current.getBoundingClientRect().right + 5;

      const width = paneRef.current.getBoundingClientRect().width + delta;

      const widthString = `${width}px`;

      if (minWidth && width < minWidth) return;

      if (maxWidth && width > maxWidth) return;

      paneRef.current.style.width = widthString;
    } else {
      const delta = event.clientY - paneRef.current.getBoundingClientRect().bottom;

      const height = paneRef.current.getBoundingClientRect().height + delta;

      const heightString = `${height}px`;

      if (minHeight && height < minHeight) return;

      if (maxHeight && height > maxHeight) return;

      paneRef.current.style.height = heightString;
    }
  };

  const handleMouseUp = () => {
    if (!paneRef.current) return;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'initial';

    onPaneResize?.(paneRef.current.style.width, paneRef.current.style.height);
  };

  return (
    <Box
      onDoubleClick={props?.onDoubleClick}
      ref={containerRef}
      mod={{ mode: mode }}
      onMouseDown={handleDragStart}
      {...getStyles('resizer')}
      {...others}
    />
  );
});

SplitPaneResizer.classes = classes;
SplitPaneResizer.displayName = 'SplitPaneResizer';
