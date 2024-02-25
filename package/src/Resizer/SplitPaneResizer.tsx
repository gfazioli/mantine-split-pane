import {
  Box,
  BoxProps,
  Factory,
  MantineColor,
  MantineRadius,
  MantineSize,
  MantineSpacing,
  StylesApiProps,
  createVarsResolver,
  factory,
  getRadius,
  getSize,
  getThemeColor,
  parseThemeColor,
  rgba,
  useProps,
  useStyles,
} from '@mantine/core';
import React, { MutableRefObject, useRef } from 'react';
import classes from './SplitPaneResizer.module.css';

export type SplitPaneResizerStylesNames = 'root';

export type SplitPaneResizerVariant =
  | 'default'
  | 'filled'
  | 'outline'
  | 'transparent'
  | 'dotted'
  | 'dashed';

export type SplitPaneResizerCssVariables = {
  root:
    | '--split-resizer-size'
    | '--split-resizer-color-light'
    | '--split-resizer-color-dark'
    | '--split-resizer-hover-color-light'
    | '--split-resizer-hover-color-dark'
    | '--split-resizer-radius'
    | '--split-resizer-knob-size'
    | '--split-resizer-knob-opacity'
    | '--split-resizer-knob-radius'
    | '--split-resizer-knob-color'
    | '--split-resizer-knob-hover-color'
    | '--split-resizer-spacing';
};

export interface SplitPaneResizerSharedProps {
  /** Split orientation, `'vertical'` by default */
  orientation?: 'horizontal' | 'vertical';

  /** Resizer size */
  size?: MantineSize | number | (string & {});

  /** Resizer radius */
  radius?: MantineRadius;

  /** Key of `theme.colors` or any valid CSS color value, by default value depends on color scheme */
  color?: MantineColor;

  /** Highlight color on hover */
  hoverColor?: MantineColor;

  /** Display knob on hover */
  withKnob?: boolean;

  /** Always display knob */
  knobAlwaysOn?: boolean;

  /** Knob size */
  knobSize?: MantineSize | number | (string & {});

  /** Knob opacity */
  knobOpacity?: number | string;

  /** Knob radius */
  knobRadius?: MantineRadius;

  /** Knob color */
  knobColor?: MantineColor;

  /** Knob hover color */
  knobHoverColor?: MantineColor;

  /** Spacing between resizer and pane */
  spacing?: MantineSpacing;
}

export type SPLIT_PANE_RESIZE_SIZE = {
  width: string;
  height: string;
};

export interface SplitPaneResizerBaseProps extends SplitPaneResizerSharedProps {
  /** The minimum width of the pane when orientation is vertical */
  minWidth?: number;

  /** The minimum height of the pane when orientation is horizontal */
  minHeight?: number;

  /** The maximum width of the pane when orientation is vertical */
  maxWidth?: number;

  /** The maximum height of the pane when orientation is horizontal */
  maxHeight?: number;

  /** Event called when resizer is double clicked */
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /** Event called when pane size starts changing */
  onResizeStart?: () => void;

  /** Event called when pane size changes */
  onResizing?: (size: SPLIT_PANE_RESIZE_SIZE) => void;

  /** Event called when pane size changes */
  onResizeEnd?: (size: SPLIT_PANE_RESIZE_SIZE) => void;

  /** The pane ref */
  paneRef: MutableRefObject<HTMLDivElement | null>;
}

export interface SplitPaneResizerProps
  extends BoxProps,
    SplitPaneResizerBaseProps,
    StylesApiProps<SplitPaneResizerFactory> {}

export type SplitPaneResizerFactory = Factory<{
  props: SplitPaneResizerProps;
  ref: HTMLDivElement;
  stylesNames: SplitPaneResizerStylesNames;
  vars: SplitPaneResizerCssVariables;
  variant: SplitPaneResizerVariant;
  //defaultComponent: 'div';
}>;

const varsResolver = createVarsResolver<SplitPaneResizerFactory>(
  (
    theme,
    {
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
      withKnob,
      knobAlwaysOn,
      spacing,
    }
  ) => {
    const colorDarkParsed = parseThemeColor({
      color: color || 'dark.5',
      theme,
    });

    const colorLightParsed = parseThemeColor({
      color: color || 'gray.3',
      theme,
    });

    const hoverColorDarkParsed = parseThemeColor({
      color: hoverColor || 'dark.3',
      theme,
    });

    const hoverColorLightParsed = parseThemeColor({
      color: hoverColor || 'gray.4',
      theme,
    });

    return {
      root: {
        '--split-resizer-size': getSize(size, 'split-resizer-size'),
        '--split-resizer-color-light': rgba(colorLightParsed.value, Number(opacity)),
        '--split-resizer-color-dark': rgba(colorDarkParsed.value, Number(opacity)),
        '--split-resizer-hover-color-light': rgba(hoverColorLightParsed.value, 1),
        '--split-resizer-hover-color-dark': rgba(hoverColorDarkParsed.value, 1),
        '--split-resizer-radius': getRadius(radius),
        '--split-resizer-knob-size': getSize(knobSize, 'split-resizer-knob-size'),
        '--split-resizer-knob-opacity': withKnob && knobAlwaysOn ? (knobOpacity as string) : '0',
        '--split-resizer-knob-hover-opacity': withKnob ? '1' : '0',
        '--split-resizer-knob-radius': getRadius(knobRadius),
        '--split-resizer-knob-color': getThemeColor(knobColor, theme),
        '--split-resizer-knob-hover-color': getThemeColor(knobHoverColor, theme),
        '--split-resizer-spacing': getSize(spacing, 'split-resizer-spacing'),
      },
    };
  }
);

const defaultProps: Partial<SplitPaneResizerProps> = {
  size: 'md',
  opacity: 0.8,
  radius: 'xs',
  knobColor: 'blue',
  knobSize: 'sm',
  knobOpacity: 0.5,
  knobRadius: 'sm',
  minWidth: 20,
  minHeight: 20,
  orientation: 'vertical',
  paneRef: { current: null },
  variant: 'default',
  withKnob: false,
  knobAlwaysOn: true,
};

export const SplitPaneResizer = factory<SplitPaneResizerFactory>((_props, ref) => {
  const props = useProps('Resizer', defaultProps, _props);

  const {
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
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    orientation,
    onResizeStart,
    onResizing,
    onResizeEnd,
    paneRef,
    variant,
    withKnob,
    knobAlwaysOn,
    spacing,

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

  const handleMouseMove = (event: MouseEvent) => {
    if (!paneRef.current) return;

    // if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const computedStyle = window.getComputedStyle(containerRef.current);

    if (orientation === 'vertical') {
      const margin = parseFloat(computedStyle.getPropertyValue('margin-left')) + 1;

      const delta = event.clientX - paneRef.current.getBoundingClientRect().right - margin;

      const width = paneRef.current.getBoundingClientRect().width + delta;

      const widthString = `${width}px`;

      if (minWidth && width < minWidth) return;

      if (maxWidth && width > maxWidth) return;

      onResizing?.({ width: widthString, height: paneRef.current.style.height });

      paneRef.current.style.width = widthString;
    } else {
      const margin = parseFloat(computedStyle.getPropertyValue('margin-top')) + 1;

      const delta = event.clientY - paneRef.current.getBoundingClientRect().bottom - margin;

      const height = paneRef.current.getBoundingClientRect().height + delta;

      const heightString = `${height}px`;

      if (minHeight && height < minHeight) return;

      if (maxHeight && height > maxHeight) return;

      onResizing?.({ width: paneRef.current.style.width, height: heightString });

      paneRef.current.style.height = heightString;
    }
  };

  const handleMouseUp = () => {
    if (!paneRef.current) return;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'initial';

    const { width, height } = paneRef.current.style || {};

    onResizeEnd?.({ width, height });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    onResizeStart?.();

    document.body.style.cursor = 'col-resize';
  };

  return (
    <Box
      onDoubleClick={props?.onDoubleClick}
      ref={containerRef}
      mod={{ orientation }}
      onMouseDown={handleDragStart}
      {...getStyles('root', { variant })}
      {...others}
    />
  );
});

SplitPaneResizer.classes = classes;
SplitPaneResizer.displayName = 'SplitPaneResizer';
