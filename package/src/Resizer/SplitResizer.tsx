import React, { CSSProperties, useMemo, useRef } from 'react';
import {
  BoxProps,
  createVarsResolver,
  Factory,
  factory,
  getGradient,
  getRadius,
  getSize,
  MantineColor,
  MantineGradient,
  MantineRadius,
  MantineSize,
  MantineSpacing,
  MantineTheme,
  parseThemeColor,
  StyleProp,
  StylesApiProps,
  UnstyledButton,
  useProps,
  useStyles,
  type MantineBreakpoint,
} from '@mantine/core';
import { useResponsiveValue } from '../hooks/use-responsive-value';
import { useSplitResizerOrientation } from '../hooks/use-split-resizer-orientation';
import { SplitPaneHandlers } from '../Pane/SplitPane';
import { useSplitContext } from '../Split.context';
import { calculateSnappedPaneSizes, DEFAULT_SNAP_TOLERANCE, normalizeSnapPoints } from './snap';
import type { ResponsiveValue } from '../types';
import classes from './SplitResizer.module.css';

export type SplitResizerStylesNames = 'root';

export type SplitResizerVariant =
  | 'default'
  | 'filled'
  | 'outline'
  | 'transparent'
  | 'gradient'
  | 'dotted'
  | 'dashed';

export type SplitResizerCssVariables = {
  root:
    | '--split-resizer-size'
    | '--split-resizer-color'
    | '--split-resizer-hover-color'
    | '--split-resizer-radius'
    | '--split-resizer-opacity'
    | '--split-resizer-knob-size'
    | '--split-resizer-knob-opacity'
    | '--split-resizer-knob-radius'
    | '--split-resizer-knob-color'
    | '--split-resizer-knob-hover-color'
    | '--split-resizer-spacing'
    | '--split-resizer-cursor-vertical'
    | '--split-resizer-cursor-horizontal';
};

export type SplitResizerOrientationValue = 'horizontal' | 'vertical';

export type SplitResizerOrientation =
  | SplitResizerOrientationValue
  | Partial<Record<MantineBreakpoint | (string & {}), SplitResizerOrientationValue>>;

export interface SplitResizerContextProps {
  /** Split orientation, `'vertical'` by default */
  orientation?: SplitResizerOrientation;

  /** Resizer opacity */
  opacity?: StyleProp<React.CSSProperties['opacity']>;

  /** Resizer size. Accepts a static value or a responsive breakpoint map. */
  size?: ResponsiveValue<MantineSize | number | (string & {})>;

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

  /** Knob size. Accepts a static value or a responsive breakpoint map. */
  knobSize?: ResponsiveValue<MantineSize | number | (string & {})>;

  /** Knob opacity */
  knobOpacity?: number | string;

  /** Knob radius */
  knobRadius?: MantineRadius;

  /** Knob color */
  knobColor?: MantineColor;

  /** Knob hover color */
  knobHoverColor?: MantineColor;

  /** Spacing between resizer and pane. Accepts a static value or a responsive breakpoint map. */
  spacing?: ResponsiveValue<MantineSpacing>;

  /** Keyboard step, default is 8 */
  step?: number;

  /** Keyboard step when shift is pressed, default is 64 */
  shiftStep?: number;

  /** Snap pane size to the nearest listed pixel value during active resizing */
  snapPoints?: number[];

  /** Maximum distance in pixels from a snap point before snapping is applied */
  snapTolerance?: number;

  /** The CSS cursor property for vertical orientation */
  cursorVertical?: CSSProperties['cursor'];

  /** The CSS cursor property for horizontal orientation */
  cursorHorizontal?: CSSProperties['cursor'];

  /** Gradient configuration used when `variant="gradient"`, default value is `theme.defaultGradient` */
  gradient?: MantineGradient;

  /** Gradient configuration used when `variant="gradient"` and `hover` is set, default value is `theme.defaultGradient` */
  hoverGradient?: MantineGradient;
}

/** Dimensions of both adjacent panes reported during and after a resize operation */
export type SPLIT_PANE_RESIZE_SIZES = {
  /** Dimensions of the pane before (left or top of) the resizer */
  beforePane: {
    width: number;
    height: number;
  };
  /** Dimensions of the pane after (right or bottom of) the resizer */
  afterPane: {
    width: number;
    height: number;
  };
};

export interface SplitResizerBaseProps extends SplitResizerContextProps {
  /** Event called when resizer is double-clicked */
  onDoubleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Event called when a resize operation begins (mouse down / touch start) */
  onResizeStart?: () => void;

  /** Event called continuously while panes are being resized (mouse move / touch move) */
  onResizing?: (sizes: SPLIT_PANE_RESIZE_SIZES) => void;

  /** Event called when a resize operation ends (mouse up / touch end) */
  onResizeEnd?: (sizes: SPLIT_PANE_RESIZE_SIZES) => void;
}

export interface SplitResizerProps
  extends BoxProps, SplitResizerBaseProps, StylesApiProps<SplitResizerFactory> {
  /**
   * The before (left | up) componentRef
   * @access private
   * */
  __beforeRef?: React.RefObject<(HTMLDivElement & SplitPaneHandlers) | null>;

  /**
   * The after (right | down) componentRef
   * @access private
   * */
  __afterRef?: React.RefObject<(HTMLDivElement & SplitPaneHandlers) | null>;
}

export type SplitResizerFactory = Factory<{
  props: SplitResizerProps;
  ref: HTMLButtonElement;
  stylesNames: SplitResizerStylesNames;
  vars: SplitResizerCssVariables;
  variant: SplitResizerVariant;
}>;

const varsResolver = createVarsResolver<SplitResizerFactory>(
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
      cursorVertical,
      cursorHorizontal,
      gradient,
      hoverGradient,
    }
  ) => {
    const knobVariant = variant === 'dotted' || variant === 'dashed';

    const forceKnobOpacityValue =
      withKnob && knobAlwaysOn && !knobVariant ? (knobOpacity as string) : '0';

    const colors = variantColorResolver({
      color,
      hover: hoverColor,
      knob: knobColor,
      hoverKnob: knobHoverColor,
      theme,
      gradient,
      hoverGradient,
      variant: variant || 'filled',
    });

    return {
      root: {
        '--split-resizer-size': getSize(size, 'split-resizer-size'),
        '--split-resizer-color': colors.color,
        '--split-resizer-hover-color': colors.hover,
        '--split-resizer-radius': getRadius(radius),
        '--split-resizer-opacity': opacity !== undefined ? (opacity as string) : '1',
        '--split-resizer-knob-size': getSize(knobSize, 'split-resizer-knob-size'),
        '--split-resizer-knob-opacity': forceKnobOpacityValue,
        '--split-resizer-knob-hover-opacity': withKnob || knobVariant ? '1' : '0',
        '--split-resizer-knob-radius': getRadius(knobRadius),
        '--split-resizer-knob-color': colors.knob,
        '--split-resizer-knob-hover-color': colors.hoverKnob,
        '--split-resizer-spacing': getSize(spacing, 'split-resizer-spacing'),
        '--split-resizer-cursor-vertical': cursorVertical || 'col-resize',
        '--split-resizer-cursor-horizontal': cursorHorizontal || 'row-resize',
      },
    };
  }
);

interface SplitResizerVariantColorsResolverInput {
  color: MantineColor | undefined;
  hover: MantineColor | undefined;
  knob: MantineColor | undefined;
  hoverKnob: MantineColor | undefined;
  theme: MantineTheme;
  variant: string;
  gradient?: MantineGradient;
  hoverGradient?: MantineGradient;
}

interface SplitResizerVariantColorResolverResult {
  color?: string;
  hover?: string;
  knob?: string;
  hoverKnob?: string;
  border?: string;
}

type SplitResizerVariantColorsResolver = (
  input: SplitResizerVariantColorsResolverInput
) => SplitResizerVariantColorResolverResult;

const variantColorResolver: SplitResizerVariantColorsResolver = ({
  color,
  hover,
  knob,
  hoverKnob,
  theme,
  variant,
  gradient,
  hoverGradient,
}: SplitResizerVariantColorsResolverInput): SplitResizerVariantColorResolverResult => {
  const parsedColor = color ? parseThemeColor({ color, theme }).value : undefined;
  const parsedHover = hover ? parseThemeColor({ color: hover, theme }).value : undefined;
  const parsedKnob = knob ? parseThemeColor({ color: knob, theme }).value : undefined;
  const parsedHoverKnob = hoverKnob
    ? parseThemeColor({ color: hoverKnob, theme }).value
    : undefined;

  const colors = {
    color: parsedColor,
    hover: parsedHover,
    knob: parsedKnob,
    hoverKnob: parsedHoverKnob,
  };

  if (variant === 'gradient') {
    colors.color = getGradient(gradient, theme);
    colors.hover = getGradient(hoverGradient || gradient, theme);
  }

  return colors;
};

export const defaultProps: Partial<SplitResizerContextProps> = {
  orientation: 'vertical',
  opacity: 0.8,
  size: 'sm',
  radius: 'xs',
  withKnob: false,
  knobAlwaysOn: true,
  knobSize: 'sm',
  knobOpacity: 0.5,
  knobRadius: 'sm',
  knobColor: 'white',
  knobHoverColor: 'white',
  spacing: 'xs',
  step: 8,
  shiftStep: 64,
  snapPoints: [],
  snapTolerance: DEFAULT_SNAP_TOLERANCE,
  cursorVertical: 'col-resize',
  cursorHorizontal: 'row-resize',
};

export const SplitResizer = factory<SplitResizerFactory>((_props) => {
  const ctx = useSplitContext();
  // Omit context-only fields that should not leak to DOM via ...rest
  const { containerSize: _containerSize, ...ctxResizerProps } = ctx || {};
  const props = useProps('SplitResizer', { ...defaultProps, ...ctxResizerProps }, _props);

  const {
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
    snapPoints,
    snapTolerance,
    cursorVertical,
    cursorHorizontal,
    color,
    hoverColor,
    variant,
    gradient,
    hoverGradient,

    onResizeStart,
    onResizing,
    onResizeEnd,
    onDoubleClick,
    __beforeRef: beforeRef,
    __afterRef: afterRef,

    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    mod,
    ...rest
  } = props;

  const orientation = useSplitResizerOrientation(propOrientation ?? 'vertical');

  // Resolve responsive values to scalars for the current viewport,
  // falling back to default props if the responsive value is undefined
  const resolvedSize = useResponsiveValue(size) ?? defaultProps.size;
  const resolvedSpacing = useResponsiveValue(spacing) ?? defaultProps.spacing;
  const resolvedKnobSize = useResponsiveValue(knobSize) ?? defaultProps.knobSize;
  const normalizedSnap = useMemo(
    () => normalizeSnapPoints({ snapPoints, snapTolerance }),
    [snapPoints, snapTolerance]
  );

  // Create resolved props for useStyles/varsResolver (needs scalar values)
  const resolvedProps = {
    ...props,
    size: resolvedSize,
    spacing: resolvedSpacing,
    knobSize: resolvedKnobSize,
  };

  const getStyles = useStyles<SplitResizerFactory>({
    name: 'SplitResizer',
    classes,
    props: resolvedProps as unknown as SplitResizerProps,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const containerRef = useRef<HTMLButtonElement>(null);

  /**
   * Applies a horizontal (left/right) delta to the two adjacent panes,
   * enforcing min/max width constraints. Used by both mouse drag and
   * keyboard arrow handlers when orientation is vertical.
   *
   * @param deltaX - The pixel offset to apply (positive = move right)
   */
  const processVerticalSize = (deltaX: number = 0) => {
    if (!beforeRef?.current || !afterRef?.current) {
      return;
    }

    const minBeforeWidth = beforeRef.current.getMinWidth?.();
    const maxBeforeWidth = beforeRef.current.getMaxWidth?.();

    const minAfterWidth = afterRef.current.getMinWidth?.();
    const maxAfterWidth = afterRef.current.getMaxWidth?.();

    const beforePane = beforeRef!.current!.splitPane;
    const afterPane = afterRef!.current!.splitPane;
    if (!beforePane || !afterPane) {
      return;
    }

    const beforeWidth = beforePane!.getBoundingClientRect().width;
    const afterWidth = afterPane!.getBoundingClientRect().width;
    const nextSizes = calculateSnappedPaneSizes({
      beforeSize: beforeWidth,
      afterSize: afterWidth,
      delta: deltaX,
      minBeforeSize: minBeforeWidth,
      maxBeforeSize: maxBeforeWidth,
      minAfterSize: minAfterWidth,
      maxAfterSize: maxAfterWidth,
      snapPoints: normalizedSnap.snapPoints,
      snapTolerance: normalizedSnap.snapTolerance,
    });

    function setVerticalSize() {
      const beforeWidthString = `${nextSizes.beforeSize}px`;
      const afterWidthString = `${nextSizes.afterSize}px`;

      const beforePaneSizes = {
        width: nextSizes.beforeSize,
        height: beforePane!.getBoundingClientRect().height,
      };
      const afterPaneSizes = {
        width: nextSizes.afterSize,
        height: afterPane!.getBoundingClientRect().height,
      };
      beforeRef?.current?.onResizing?.(beforePaneSizes);
      afterRef?.current?.onResizing?.(afterPaneSizes);

      onResizing?.({
        beforePane: beforePaneSizes,
        afterPane: afterPaneSizes,
      });

      beforePane!.style.width = beforeWidthString;
      afterPane!.style.width = afterWidthString;
    }

    setVerticalSize();
  };

  /**
   * Applies a vertical (up/down) delta to the two adjacent panes,
   * enforcing min/max height constraints. Used by both mouse drag and
   * keyboard arrow handlers when orientation is horizontal.
   *
   * @param deltaY - The pixel offset to apply (positive = move down)
   */
  const processHorizontalSize = (deltaY: number = 0) => {
    if (!beforeRef?.current || !afterRef?.current) {
      return;
    }

    const minBeforeHeight = beforeRef.current.getMinHeight?.();
    const maxBeforeHeight = beforeRef.current.getMaxHeight?.();

    const minAfterHeight = afterRef.current.getMinHeight?.();
    const maxAfterHeight = afterRef.current.getMaxHeight?.();

    const beforePane = beforeRef!.current!.splitPane;
    const afterPane = afterRef!.current!.splitPane;
    if (!beforePane || !afterPane) {
      return;
    }

    const beforeHeight = beforePane!.getBoundingClientRect().height;
    const afterHeight = afterPane!.getBoundingClientRect().height;
    const nextSizes = calculateSnappedPaneSizes({
      beforeSize: beforeHeight,
      afterSize: afterHeight,
      delta: deltaY,
      minBeforeSize: minBeforeHeight,
      maxBeforeSize: maxBeforeHeight,
      minAfterSize: minAfterHeight,
      maxAfterSize: maxAfterHeight,
      snapPoints: normalizedSnap.snapPoints,
      snapTolerance: normalizedSnap.snapTolerance,
    });

    function setHorizontalSize() {
      const beforeHeightString = `${nextSizes.beforeSize}px`;
      const afterHeightString = `${nextSizes.afterSize}px`;

      const beforePaneSizes = {
        width: beforePane!.getBoundingClientRect().width,
        height: nextSizes.beforeSize,
      };
      const afterPaneSizes = {
        width: afterPane!.getBoundingClientRect().width,
        height: nextSizes.afterSize,
      };

      onResizing?.({
        beforePane: beforePaneSizes,
        afterPane: afterPaneSizes,
      });

      beforeRef?.current?.onResizing?.(beforePaneSizes);
      afterRef?.current?.onResizing?.(afterPaneSizes);

      beforePane!.style.height = beforeHeightString;
      afterPane!.style.height = afterHeightString;
    }

    setHorizontalSize();
  };

  /**
   * Initiates a resize operation. Disables text selection on the document,
   * attaches the appropriate move/end listeners, fires `onResizeStart` on
   * both the resizer and the adjacent panes, and overrides the body cursor.
   *
   * @param event - The originating mousedown or touchstart event
   */
  const handleStart = (
    event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

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
    beforeRef?.current?.onResizeStart?.();
    afterRef?.current?.onResizeStart?.();

    document.body.style.cursor =
      (orientation === 'vertical' ? cursorVertical : cursorHorizontal) ?? '';
  };

  /**
   * Processes pointer movement during a resize, computing the delta from the
   * resizer center and delegating to `processVerticalSize` or `processHorizontalSize`.
   * Exits gracefully if adjacent pane refs are unavailable.
   *
   * @param event - The native mousemove or touchmove event
   */
  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!beforeRef?.current || !afterRef?.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const computedStyle = window.getComputedStyle(containerRef.current!);

    if (orientation === 'vertical') {
      const size = parseFloat(computedStyle.getPropertyValue('width'));
      const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
      const deltaX = clientX - containerRef.current!.getBoundingClientRect().left - size / 2;

      return processVerticalSize(deltaX);
    }

    if (orientation === 'horizontal') {
      const size = parseFloat(computedStyle.getPropertyValue('height'));
      const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
      const deltaY = clientY - containerRef.current!.getBoundingClientRect().top - size / 2;

      return processHorizontalSize(deltaY);
    }
  };

  /**
   * Ends a mouse-initiated resize. Re-enables text selection, removes document
   * listeners, resets the body cursor, and fires `onResizeEnd` on the resizer
   * and both adjacent panes with their final dimensions.
   */
  const handleMouseUp = () => {
    if (!beforeRef?.current || !afterRef?.current) {
      return;
    }

    document.body.style.userSelect = 'initial';
    document.body.style.webkitUserSelect = 'initial';

    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'initial';

    const beforePane = beforeRef!.current!.splitPane;
    const afterPane = afterRef!.current!.splitPane;

    const beforePaneSizes = {
      width: beforePane!.getBoundingClientRect().width,
      height: beforePane!.getBoundingClientRect().height,
    };
    const afterPaneSizes = {
      width: afterPane!.getBoundingClientRect().width,
      height: afterPane!.getBoundingClientRect().height,
    };

    onResizeEnd?.({
      beforePane: beforePaneSizes,
      afterPane: afterPaneSizes,
    });

    beforeRef?.current?.onResizeEnd?.(beforePaneSizes);
    afterRef?.current?.onResizeEnd?.(afterPaneSizes);
  };

  /**
   * Ends a touch-initiated resize. Removes document listeners, resets the body
   * cursor, and fires `onResizeEnd` on the resizer and both adjacent panes
   * with their final dimensions.
   */
  const handleTouchEnd = () => {
    if (!beforeRef?.current || !afterRef?.current) {
      return;
    }

    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleTouchEnd);

    document.body.style.cursor = 'initial';

    const beforePane = beforeRef!.current!.splitPane;
    const afterPane = afterRef!.current!.splitPane;

    const beforePaneSizes = {
      width: beforePane!.getBoundingClientRect().width,
      height: beforePane!.getBoundingClientRect().height,
    };
    const afterPaneSizes = {
      width: afterPane!.getBoundingClientRect().width,
      height: afterPane!.getBoundingClientRect().height,
    };

    onResizeEnd?.({
      beforePane: beforePaneSizes,
      afterPane: afterPaneSizes,
    });

    beforeRef?.current?.onResizeEnd?.(beforePaneSizes);
    afterRef?.current?.onResizeEnd?.(afterPaneSizes);
  };

  /**
   * Handles keyboard-driven resizing. Arrow Left/Right resize in vertical
   * orientation, Arrow Up/Down in horizontal orientation. Holding Shift
   * uses the larger `shiftStep` increment. Escape blurs the resizer.
   *
   * @param event - The React keyboard event
   */
  const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (containerRef.current !== document.activeElement) {
      return;
    }

    const code = event.nativeEvent.code;

    const arrowLeftRight = code === 'ArrowRight' || code === 'ArrowLeft';
    const arrowUpDown = code === 'ArrowUp' || code === 'ArrowDown';

    const delta = (event.shiftKey ? shiftStep : step) ?? 8;

    if (orientation === 'vertical' && arrowLeftRight) {
      event.preventDefault();
      event.stopPropagation();

      const deltaSign = code === 'ArrowRight' ? 1 : -1;
      const deltaX = delta * deltaSign;
      return processVerticalSize(deltaX);
    }

    if (orientation === 'horizontal' && arrowUpDown) {
      event.preventDefault();
      event.stopPropagation();

      const deltaSign = code === 'ArrowDown' ? 1 : -1;
      const deltaY = delta * deltaSign;
      return processHorizontalSize(deltaY);
    }

    if (code === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      containerRef.current?.blur();
    }
  };

  /**
   * Resets both adjacent panes to their initial sizes and fires the
   * `onDoubleClick` callback. Triggered by a double-click on the resizer.
   *
   * @param e - The originating double-click mouse event
   */
  const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    beforeRef?.current?.resetInitialSize?.(e);
    afterRef?.current?.resetInitialSize?.(e);

    onDoubleClick?.(e);
  };

  return (
    <UnstyledButton
      ref={containerRef}
      mod={{ orientation }}
      onMouseDown={handleStart}
      onKeyDown={handleKeyUp}
      onTouchStart={handleStart}
      onDoubleClick={handleDoubleClick}
      aria-label="Resize"
      {...getStyles('root', { variant: variant || 'default' })}
      {...rest}
    />
  );
});

SplitResizer.classes = classes;
SplitResizer.displayName = 'SplitResizer';
