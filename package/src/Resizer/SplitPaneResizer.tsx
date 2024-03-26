import {
  BoxProps,
  Factory,
  MantineColor,
  MantineRadius,
  MantineSize,
  MantineSpacing,
  StylesApiProps,
  UnstyledButton,
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

  /** Keyboard step, default is 8 */
  step?: number;

  /** Keyboard step when shift is pressed, default is 64 */
  shiftStep?: number;
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
  onDoubleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

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
  ref: HTMLButtonElement;
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
      variant,
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

    const knobVariant = variant === 'dotted' || variant === 'dashed';

    return {
      root: {
        '--split-resizer-size': getSize(size, 'split-resizer-size'),
        '--split-resizer-color-light': rgba(colorLightParsed.value, Number(opacity)),
        '--split-resizer-color-dark': rgba(colorDarkParsed.value, Number(opacity)),
        '--split-resizer-hover-color-light': rgba(hoverColorLightParsed.value, 1),
        '--split-resizer-hover-color-dark': rgba(hoverColorDarkParsed.value, 1),
        '--split-resizer-radius': getRadius(radius),
        '--split-resizer-knob-size': getSize(knobSize, 'split-resizer-knob-size'),
        '--split-resizer-knob-opacity':
          withKnob && knobAlwaysOn && !knobVariant ? (knobOpacity as string) : '0',
        '--split-resizer-knob-hover-opacity': withKnob || knobVariant ? '1' : '0',
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
  step: 8,
  shiftStep: 64,
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
    step,
    shiftStep,

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

  /**
   * Start resizing
   * @param event
   */
  const handleStart = (
    event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    // disable the userSelect by css starting from the entire document
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    if (event.type === 'touchstart') {
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    onResizeStart?.();

    document.body.style.cursor = 'col-resize';
  };

  /**
   * Handle resizing
   * @param event
   * @returns
   */
  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!paneRef.current) return;

    event.preventDefault();
    event.stopPropagation();

    const computedStyle = window.getComputedStyle(containerRef.current);

    const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
    const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;

    if (orientation === 'vertical') {
      const margin = parseFloat(computedStyle.getPropertyValue('margin-left')) + 1;

      const delta = clientX - paneRef.current.getBoundingClientRect().right - margin;

      const width = paneRef.current.getBoundingClientRect().width + delta;

      const widthString = `${width}px`;

      if (minWidth && width < minWidth) return;

      if (maxWidth && width > maxWidth) return;

      onResizing?.({ width: widthString, height: paneRef.current.style.height });

      paneRef.current.style.width = widthString;
    } else {
      const margin = parseFloat(computedStyle.getPropertyValue('margin-top')) + 1;

      const delta = clientY - paneRef.current.getBoundingClientRect().bottom - margin;

      const height = paneRef.current.getBoundingClientRect().height + delta;

      const heightString = `${height}px`;

      if (minHeight && height < minHeight) return;

      if (maxHeight && height > maxHeight) return;

      onResizing?.({ width: paneRef.current.style.width, height: heightString });

      paneRef.current.style.height = heightString;
    }
  };

  /**
   * Stop resizing for mouse
   * @returns
   */
  const handleMouseUp = () => {
    if (!paneRef.current) return;

    // reenable the userSelect by css starting from the entire document
    document.body.style.userSelect = 'initial';
    document.body.style.webkitUserSelect = 'initial';

    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'initial';

    const { width, height } = paneRef.current.style || {};

    onResizeEnd?.({ width, height });
  };

  /**
   * Stop resizing for touch
   * @returns
   */
  const handleTouchEnd = () => {
    if (!paneRef.current) return;

    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleTouchEnd);

    document.body.style.cursor = 'initial';

    const { width, height } = paneRef.current.style || {};

    onResizeEnd?.({ width, height });
  };

  /**
   * Handle key up
   * @param event
   */
  const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // check if containerRef has got the focus
    if (containerRef.current !== document.activeElement) {
      return;
    }

    const delta = event.shiftKey ? shiftStep : step;

    // if the mode === 'vertical' and the key is 'ArrowRight' or 'ArrowLeft'
    if (
      orientation === 'vertical' &&
      (event.nativeEvent.code === 'ArrowRight' || event.nativeEvent.code === 'ArrowLeft')
    ) {
      event.preventDefault();
      event.stopPropagation();

      // increment or decrement the width of the paneRef.current

      const deltaSign = event.nativeEvent.code === 'ArrowRight' ? 1 : -1;

      const width = paneRef.current.getBoundingClientRect().width + delta * deltaSign;
      const widthString = `${width}px`;

      if (minWidth && width < minWidth) return;

      if (maxWidth && width > maxWidth) return;

      onResizing?.({ width: widthString, height: paneRef.current.style.height });

      paneRef.current.style.width = widthString;
    }

    // if the mode === 'horizontal' and the key is 'ArrowUp' or 'ArrowDown'
    if (
      orientation === 'horizontal' &&
      (event.nativeEvent.code === 'ArrowUp' || event.nativeEvent.code === 'ArrowDown')
    ) {
      event.preventDefault();
      event.stopPropagation();

      // increment or decrement the height of the paneRef.current

      const deltaSign = event.nativeEvent.code === 'ArrowDown' ? 1 : -1;

      const height = paneRef.current.getBoundingClientRect().height + delta * deltaSign;
      const heightString = `${height}px`;

      if (minHeight && height < minHeight) return;

      if (maxHeight && height > maxHeight) return;

      onResizing?.({ width: paneRef.current.style.width, height: heightString });

      paneRef.current.style.height = heightString;
    }

    if (event.nativeEvent.code === 'Escape') {
      event.preventDefault();
      event.stopPropagation();

      // remove focus from the containerRef
      containerRef.current.blur();
    }
  };

  return (
    <UnstyledButton
      onDoubleClick={props?.onDoubleClick}
      ref={containerRef}
      mod={{ orientation }}
      onMouseDown={handleStart}
      onKeyDown={handleKeyUp}
      onTouchStart={handleStart}
      aria-label="Resize"
      {...getStyles('root', { variant })}
      {...others}
    />
  );
});

SplitPaneResizer.classes = classes;
SplitPaneResizer.displayName = 'SplitPaneResizer';
