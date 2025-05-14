import React, { CSSProperties, useRef } from 'react';
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
} from '@mantine/core';
import { SplitPaneHandlers } from '../Pane/SplitPane';
import { useSplitContext } from '../Split.context';
import classes from './SplitPaneResizer.module.css';

export type SplitPaneResizerStylesNames = 'root';

export type SplitPaneResizerVariant =
  | 'default'
  | 'filled'
  | 'outline'
  | 'transparent'
  | 'gradient'
  | 'dotted'
  | 'dashed';

export type SplitPaneResizerCssVariables = {
  root:
    | '--split-resizer-size'
    | '--split-resizer-color'
    | '--split-resizer-hover-color'
    | '--split-resizer-radius'
    | '--split-resizer-knob-size'
    | '--split-resizer-knob-opacity'
    | '--split-resizer-knob-radius'
    | '--split-resizer-knob-color'
    | '--split-resizer-knob-hover-color'
    | '--split-resizer-spacing'
    | '--split-resizer-cursor-vertical'
    | '--split-resizer-cursor-horizontal';
};

export interface SplitPaneResizerContextProps {
  /** Split orientation, `'vertical'` by default */
  orientation?: 'horizontal' | 'vertical';

  /** Resizer opacity */
  opacity?: StyleProp<React.CSSProperties['opacity']>;

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

  /** The CSS cursor property for vertical orientation */
  cursorVertical?: CSSProperties['cursor'];

  /** The CSS cursor property for horizontal orientation */
  cursorHorizontal?: CSSProperties['cursor'];

  /** Gradient configuration used when `variant="gradient"`, default value is `theme.defaultGradient` */
  gradient?: MantineGradient;

  /** Gradient configuration used when `variant="gradient"` and `hover` is set, default value is `theme.defaultGradient` */
  hoverGradient?: MantineGradient;
}

export type SPLIT_PANE_RESIZE_SIZES = {
  beforePane: {
    width: number;
    height: number;
  };
  afterPane: {
    width: number;
    height: number;
  };
};

export interface SplitPaneResizerBaseProps extends SplitPaneResizerContextProps {
  /** Event called when resizer is double clicked */
  onDoubleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Event called when pane size starts changing */
  onResizeStart?: () => void;

  /** Event called when pane size changes */
  onResizing?: (sizes: SPLIT_PANE_RESIZE_SIZES) => void;

  /** Event called when pane size changes */
  onResizeEnd?: (sizes: SPLIT_PANE_RESIZE_SIZES) => void;
}

export interface SplitPaneResizerProps
  extends BoxProps,
    SplitPaneResizerBaseProps,
    StylesApiProps<SplitPaneResizerFactory> {
  /**
   * The before (left | up) componentRef
   * @access private
   * */
  __beforeRef?: React.RefObject<HTMLDivElement & SplitPaneHandlers>;

  /**
   * The after (right | down) componentRef
   * @access private
   * */
  __afterRef?: React.RefObject<HTMLDivElement & SplitPaneHandlers>;
}

export type SplitPaneResizerFactory = Factory<{
  props: SplitPaneResizerProps;
  ref: HTMLButtonElement;
  stylesNames: SplitPaneResizerStylesNames;
  vars: SplitPaneResizerCssVariables;
  variant: SplitPaneResizerVariant;
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

interface SplitPaneResizerVariantColorsResolverInput {
  color: MantineColor | undefined;
  hover: MantineColor | undefined;
  knob: MantineColor | undefined;
  hoverKnob: MantineColor | undefined;
  theme: MantineTheme;
  variant: string;
  gradient?: MantineGradient;
  hoverGradient?: MantineGradient;
  autoContrast?: boolean;
}

interface SplitPaneResizerVariantColorResolverResult {
  color: string;
  hover: string;
  knob: string;
  hoverKnob?: string;
  border?: string;
}

type SplitPaneResizerVariantColorsResolver = (
  input: SplitPaneResizerVariantColorsResolverInput
) => SplitPaneResizerVariantColorResolverResult;

const variantColorResolver: SplitPaneResizerVariantColorsResolver = ({
  color,
  hover,
  knob,
  hoverKnob,
  theme,
  variant,
  gradient,
  hoverGradient,
  autoContrast,
}: SplitPaneResizerVariantColorsResolverInput): SplitPaneResizerVariantColorResolverResult => {
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

export const defaultProps: Partial<SplitPaneResizerContextProps> = {
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
  cursorVertical: 'col-resize',
  cursorHorizontal: 'row-resize',
};

export const SplitPaneResizer = factory<SplitPaneResizerFactory>((_props, _) => {
  const ctx = useSplitContext();
  const props = useProps('SplitPaneResizer', { ...defaultProps, ...ctx }, _props);

  const {
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
   * Process the logic for vertical resizing.
   * This function is called when the user drags the resizer
   * in the vertical direction. It's used also for the keyboard
   * resizing.
   *
   * @param deltaX
   * @returns
   */
  const processVerticalSize = (deltaX: number = 0) => {
    const minBeforeWidth = beforeRef.current.getMinWidth();
    const maxBeforeWidth = beforeRef.current.getMaxWidth();

    const minAfterWidth = afterRef.current.getMinWidth();
    const maxAfterWidth = afterRef.current.getMaxWidth();

    const beforePane = beforeRef.current.splitPane;
    const afterPane = afterRef.current.splitPane;

    let beforeWidth = beforePane.getBoundingClientRect().width;
    let afterWidth = afterPane.getBoundingClientRect().width;

    const isBeforeWidthMaxExceeded = maxBeforeWidth && beforeWidth + deltaX > maxBeforeWidth;
    const isAfterWidthMaxExceeded = maxAfterWidth && afterWidth - deltaX > maxAfterWidth;
    const isBeforeWidthMinExceeded = minBeforeWidth && beforeWidth + deltaX < minBeforeWidth;
    const isAfterWidthMinExceeded = minAfterWidth && afterWidth - deltaX < minAfterWidth;
    const isBeforeWidthNegative = beforeWidth + deltaX < 0;
    const isAfterWidthNegative = afterWidth - deltaX < 0;

    function setVerticalSize() {
      const beforeWidthString = `${beforeWidth}px`;
      const afterWidthString = `${afterWidth}px`;

      const beforePaneSizes = {
        width: beforeWidth,
        height: beforePane.getBoundingClientRect().height,
      };
      const afterPaneSizes = {
        width: afterWidth,
        height: afterPane.getBoundingClientRect().height,
      };
      beforeRef.current.onResizing?.(beforePaneSizes);
      afterRef.current.onResizing?.(afterPaneSizes);

      onResizing?.({
        beforePane: beforePaneSizes,
        afterPane: afterPaneSizes,
      });

      beforePane.style.width = beforeWidthString;
      afterPane.style.width = afterWidthString;
    }

    // Before
    if (!isAfterWidthMaxExceeded && isBeforeWidthMinExceeded) {
      afterWidth += beforeWidth - minBeforeWidth;
      beforeWidth = minBeforeWidth;
      return setVerticalSize();
    }

    if (!isAfterWidthMaxExceeded && isBeforeWidthNegative) {
      afterWidth += beforeWidth;
      beforeWidth = 0;
      return setVerticalSize();
    }

    if (!isAfterWidthMinExceeded && !isAfterWidthNegative && isBeforeWidthMaxExceeded) {
      afterWidth -= maxBeforeWidth - beforeWidth;
      beforeWidth = maxBeforeWidth;
      return setVerticalSize();
    }

    // After
    if (!isBeforeWidthMaxExceeded && isAfterWidthMinExceeded) {
      beforeWidth += afterWidth - minAfterWidth;
      afterWidth = minAfterWidth;
      return setVerticalSize();
    }

    if (!isBeforeWidthMaxExceeded && isAfterWidthNegative) {
      beforeWidth += afterWidth;
      afterWidth = 0;
      // beforeWidth = containerRef.current.parentElement.getBoundingClientRect().width;
      return setVerticalSize();
    }

    if (!isBeforeWidthMinExceeded && !isBeforeWidthNegative && isAfterWidthMaxExceeded) {
      beforeWidth -= maxAfterWidth - afterWidth;
      afterWidth = maxAfterWidth;
      return setVerticalSize();
    }

    if (
      isBeforeWidthNegative ||
      isAfterWidthNegative ||
      isBeforeWidthMaxExceeded ||
      isAfterWidthMaxExceeded ||
      isBeforeWidthMinExceeded ||
      isAfterWidthMinExceeded
    ) {
      return;
    }

    beforeWidth += deltaX;
    afterWidth -= deltaX;

    setVerticalSize();
  };

  /**
   * Process the logic for horizontal resizing.
   * This function is called when the user drags the resizer
   * in the horizontal direction. It's used also for the keyboard
   * resizing.
   *
   * @param deltaY
   * @returns
   */
  const processHorizontalSize = (deltaY: number = 0) => {
    const minBeforeHeight = beforeRef.current.getMinHeight();
    const maxBeforeHeight = beforeRef.current.getMaxHeight();

    const minAfterHeight = afterRef.current.getMinHeight();
    const maxAfterHeight = afterRef.current.getMaxHeight();

    const beforePane = beforeRef.current.splitPane;
    const afterPane = afterRef.current.splitPane;

    let beforeHeight = beforePane.getBoundingClientRect().height;
    let afterHeight = afterPane.getBoundingClientRect().height;

    const isBeforeHeightMaxExceeded = maxBeforeHeight && beforeHeight + deltaY > maxBeforeHeight;
    const isAfterHeightMaxExceeded = maxAfterHeight && afterHeight - deltaY > maxAfterHeight;
    const isBeforeHeightMinExceeded = minBeforeHeight && beforeHeight + deltaY < minBeforeHeight;
    const isAfterHeightMinExceeded = minAfterHeight && afterHeight - deltaY < minAfterHeight;
    const isBeforeHeightNegative = beforeHeight + deltaY < 0;
    const isAfterHeightNegative = afterHeight - deltaY < 0;

    function setHorizontalSize() {
      const beforeHeightString = `${beforeHeight}px`;
      const afterHeightString = `${afterHeight}px`;

      const beforePaneSizes = {
        width: beforePane.getBoundingClientRect().width,
        height: beforeHeight,
      };
      const afterPaneSizes = {
        width: afterPane.getBoundingClientRect().width,
        height: afterHeight,
      };

      onResizing?.({
        beforePane: beforePaneSizes,
        afterPane: afterPaneSizes,
      });

      beforeRef.current.onResizing?.(beforePaneSizes);
      afterRef.current.onResizing?.(afterPaneSizes);

      beforePane.style.height = beforeHeightString;
      afterPane.style.height = afterHeightString;
    }

    // Before
    if (!isAfterHeightMaxExceeded && isBeforeHeightMinExceeded) {
      afterHeight += beforeHeight - minBeforeHeight;
      beforeHeight = minBeforeHeight;
      return setHorizontalSize();
    }

    if (!isAfterHeightMaxExceeded && isBeforeHeightNegative) {
      afterHeight += beforeHeight;
      beforeHeight = 0;
      return setHorizontalSize();
    }

    if (!isAfterHeightMinExceeded && !isAfterHeightNegative && isBeforeHeightMaxExceeded) {
      afterHeight -= maxBeforeHeight - beforeHeight;
      beforeHeight = maxBeforeHeight;
      return setHorizontalSize();
    }

    // After
    if (!isBeforeHeightMaxExceeded && isAfterHeightMinExceeded) {
      beforeHeight += afterHeight - minAfterHeight;
      afterHeight = minAfterHeight;
      return setHorizontalSize();
    }

    if (!isBeforeHeightMaxExceeded && isAfterHeightNegative) {
      beforeHeight += afterHeight;
      afterHeight = 0;
      // beforeHeight = containerRef.current.parentElement.getBoundingClientRect().height;
      return setHorizontalSize();
    }

    if (!isBeforeHeightMinExceeded && !isBeforeHeightNegative && isAfterHeightMaxExceeded) {
      beforeHeight -= maxAfterHeight - afterHeight;
      afterHeight = maxAfterHeight;
      return setHorizontalSize();
    }

    if (
      isBeforeHeightNegative ||
      isAfterHeightNegative ||
      isBeforeHeightMaxExceeded ||
      isAfterHeightMaxExceeded ||
      isBeforeHeightMinExceeded ||
      isAfterHeightMinExceeded
    ) {
      return;
    }
    beforeHeight += deltaY;
    afterHeight -= deltaY;

    setHorizontalSize();
  };

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
    beforeRef.current.onResizeStart?.();
    afterRef.current.onResizeStart?.();

    document.body.style.cursor = orientation === 'vertical' ? cursorVertical : cursorHorizontal;
  };

  /**
   * Handle resizing
   * @param event
   * @returns
   */
  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!beforeRef.current || !afterRef.current) {
      throw new Error('beforeRef or afterRef is not defined');
    }

    event.preventDefault();
    event.stopPropagation();

    const computedStyle = window.getComputedStyle(containerRef.current);

    if (orientation === 'vertical') {
      const margin = parseFloat(computedStyle.getPropertyValue('margin-right')) - 1;
      const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
      const deltaX = clientX - containerRef.current.getBoundingClientRect().left - margin;

      return processVerticalSize(deltaX);
    }

    if (orientation === 'horizontal') {
      const margin = parseFloat(computedStyle.getPropertyValue('margin-bottom')) - 1;
      const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
      const deltaY = clientY - containerRef.current.getBoundingClientRect().top - margin;

      return processHorizontalSize(deltaY);
    }
  };

  /**
   * Stop resizing for mouse
   * @returns
   */
  const handleMouseUp = () => {
    if (!beforeRef.current || !afterRef.current) {
      throw new Error('beforeRef or afterRef is not defined');
    }

    // reenable the userSelect by css starting from the entire document
    document.body.style.userSelect = 'initial';
    document.body.style.webkitUserSelect = 'initial';

    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'initial';

    const beforePane = beforeRef.current.splitPane;
    const afterPane = afterRef.current.splitPane;

    const beforePaneSizes = {
      width: beforePane.getBoundingClientRect().width,
      height: beforePane.getBoundingClientRect().height,
    };
    const afterPaneSizes = {
      width: afterPane.getBoundingClientRect().width,
      height: afterPane.getBoundingClientRect().height,
    };

    onResizeEnd?.({
      beforePane: beforePaneSizes,
      afterPane: afterPaneSizes,
    });

    beforeRef.current.onResizeEnd?.(beforePaneSizes);
    afterRef.current.onResizeEnd?.(afterPaneSizes);
  };

  /**
   * Stop resizing for touch
   * @returns
   */
  const handleTouchEnd = () => {
    if (!beforeRef.current || !afterRef.current) {
      throw new Error('beforeRef or afterRef is not defined');
    }

    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleTouchEnd);

    document.body.style.cursor = 'initial';

    const beforePane = beforeRef.current.splitPane;
    const afterPane = afterRef.current.splitPane;

    const beforePaneSizes = {
      width: beforePane.getBoundingClientRect().width,
      height: beforePane.getBoundingClientRect().height,
    };
    const afterPaneSizes = {
      width: afterPane.getBoundingClientRect().width,
      height: afterPane.getBoundingClientRect().height,
    };

    onResizeEnd?.({
      beforePane: beforePaneSizes,
      afterPane: afterPaneSizes,
    });

    beforeRef.current.onResizeEnd?.(beforePaneSizes);
    afterRef.current.onResizeEnd?.(afterPaneSizes);
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

    const code = event.nativeEvent.code;

    const arrowLeftRight = code === 'ArrowRight' || code === 'ArrowLeft';
    const arrowUpDown = code === 'ArrowUp' || code === 'ArrowDown';

    const delta = event.shiftKey ? shiftStep : step;

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

      // remove focus from the containerRef
      containerRef.current.blur();
    }
  };

  /**
   * Used to reset the initial size of the pane
   *
   * @param e - The event object
   */
  const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    beforeRef.current.resetInitialSize(e);
    afterRef.current.resetInitialSize(e);

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

SplitPaneResizer.classes = classes;
SplitPaneResizer.displayName = 'SplitPaneResizer';
