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
import {
  SplitPaneResizer,
  SplitPaneResizerBaseProps,
  SplitPaneResizerVariant,
} from '../Resizer/SplitPaneResizer';
import { useSplitContext } from '../Split.context';
import classes from './SplitPane.module.css';

export type SplitPaneStylesNames = 'root';

export type SplitPaneVariant = SplitPaneResizerVariant;

export type SplitPaneCssVariables = {};

export interface SplitPaneProps
  extends BoxProps,
    Omit<SplitPaneResizerBaseProps, 'paneRef'>,
    StylesApiProps<SplitPaneFactory> {
  /** Split pane content */
  children: React.ReactNode;

  /** Grow pane to fill available space */
  grow?: boolean;

  /** Initial width of the pane */
  initialWidth?: number | string;

  /** Initial height of the pane */
  initialHeight?: number | string;

  /** Usually you won't need to use this prop directly, it's used internally by Split component */
  withResizer?: boolean;
}

export type SplitPaneFactory = Factory<{
  props: SplitPaneProps;
  ref: HTMLDivElement;
  stylesNames: SplitPaneStylesNames;
  vars: SplitPaneCssVariables;
  variant: SplitPaneVariant;
  //defaultComponent: 'div';
}>;

const varsResolver = createVarsResolver<SplitPaneFactory>((_, { grow }) => {
  return {
    root: {
      '--split-pane-grow': grow ? 1 : 'initial',
    },
  };
});

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
    opacity,
    radius,
    knobSize,
    knobOpacity,
    knobRadius,
    knobColor,
    knobHoverColor,
    initialWidth,
    initialHeight,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    onResizeStart,
    onResizing,
    onResizeEnd,
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

  const {
    orientation,
    size: sizeContext,
    opacity: opacityContext,
    radius: radiusContext,
    color: colorContext,
    hoverColor: hoverColorContext,
    knobSize: knobSizeContext,
    knobOpacity: knobOpacityContext,
    knobRadius: knobRadiusContext,
    knobColor: knobColorContext,
    knobHoverColor: knobHoverColorContext,
    variant: variantContext,
    withKnob: withKnobContext,
    knobAlwaysOn: knobAlwaysOnContext,
    spacing: spacingContext,
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
    varsResolver,
  });

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (orientation === 'vertical') {
      paneRef.current.style.width =
        typeof initialWidth === 'number' ? `${initialWidth}px` : initialWidth;
    }

    if (orientation === 'horizontal') {
      paneRef.current.style.height =
        typeof initialHeight === 'number' ? `${initialHeight}px` : initialHeight;
    }
  };

  return (
    <>
      <Box
        ref={paneRef}
        w={orientation === 'vertical' ? initialWidth : undefined}
        h={orientation === 'horizontal' ? initialHeight : undefined}
        mod={{ orientation }}
        {...others}
        {...getStyles('root')}
      >
        {children}
      </Box>
      {withResizer && (
        <SplitPaneResizer
          onResizeStart={onResizeStart}
          onResizing={onResizing}
          onResizeEnd={onResizeEnd}
          onDoubleClick={handleDoubleClick}
          paneRef={paneRef}
          size={size === undefined ? sizeContext : size}
          opacity={opacity === undefined ? opacityContext : opacity}
          radius={radius === undefined ? radiusContext : radius}
          color={color === undefined ? colorContext : color}
          hoverColor={hoverColor === undefined ? hoverColorContext : hoverColor}
          knobSize={knobSize === undefined ? knobSizeContext : knobSize}
          knobOpacity={knobOpacity === undefined ? knobOpacityContext : knobOpacity}
          knobRadius={knobRadius === undefined ? knobRadiusContext : knobRadius}
          knobColor={knobColor === undefined ? knobColorContext : knobColor}
          knobHoverColor={knobHoverColor === undefined ? knobHoverColorContext : knobHoverColor}
          withKnob={withKnob === undefined ? withKnobContext : withKnob}
          knobAlwaysOn={knobAlwaysOn === undefined ? knobAlwaysOnContext : knobAlwaysOn}
          minWidth={minWidth}
          minHeight={minHeight}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          orientation={orientation}
          spacing={spacing === undefined ? spacingContext : spacing}
          variant={variant === undefined ? variantContext : variant}
        />
      )}
    </>
  );
});

SplitPane.classes = classes;
SplitPane.displayName = 'SplitPane';
