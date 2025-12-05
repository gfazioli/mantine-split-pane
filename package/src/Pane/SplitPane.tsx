import React, { useEffect, useImperativeHandle } from 'react';
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
import { SplitResizerVariant } from '../Resizer/SplitResizer';
import { useSplitContext } from '../Split.context';
import classes from './SplitPane.module.css';

export type SplitPaneStylesNames = 'root';

export type SplitPaneVariant = SplitResizerVariant;

export type SplitPaneCssVariables = {};

export interface SplitPaneHandlers {
  resetInitialSize?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  getMinWidth?: () => number;
  getMinHeight?: () => number;
  getMaxWidth?: () => number;
  getMaxHeight?: () => number;
  getInitialWidth?: () => number;
  getInitialHeight?: () => number;
  onResizeStart?: () => void;
  onResizing?: (size: SPLIT_PANE_SIZE) => void;
  onResizeEnd?: (size: SPLIT_PANE_SIZE) => void;
  splitPane?: HTMLDivElement;
}

export type SPLIT_PANE_SIZE = {
  width: number;
  height: number;
};

export interface SplitPaneBaseProps {
  /** Grow pane to fill available space */
  grow?: boolean;

  /** Initial width of the pane */
  initialWidth?: number | string;

  /** Initial height of the pane */
  initialHeight?: number | string;

  /** The minimum width of the pane when orientation is vertical */
  minWidth?: number | string;

  /** The minimum height of the pane when orientation is horizontal */
  minHeight?: number | string;

  /** The maximum width of the pane when orientation is vertical */
  maxWidth?: number | string;

  /** The maximum height of the pane when orientation is horizontal */
  maxHeight?: number | string;

  /** Event called when pane size starts changing */
  onResizeStart?: () => void;

  /** Event called when pane size changes */
  onResizing?: (size: SPLIT_PANE_SIZE) => void;

  /** Event called when pane size changes */
  onResizeEnd?: (size: SPLIT_PANE_SIZE) => void;

  /** Event called to reset initial size */
  onResetInitialSize?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface SplitPaneProps
  extends BoxProps, SplitPaneBaseProps, StylesApiProps<SplitPaneFactory> {
  /** Split pane content */
  children: React.ReactNode;

  ref?: React.RefObject<HTMLDivElement & SplitPaneHandlers>;
  // ref?: React.ForwardedRef<HTMLDivElement & SplitPaneHandlers>;
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
  grow: false,
};

export const SplitPane = factory<SplitPaneFactory>((_props, ref) => {
  const props = useProps('Pane', defaultProps, _props);

  const ctx = useSplitContext();

  const {
    children,
    grow,
    initialWidth,
    initialHeight,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,

    onResizeStart,
    onResizing,
    onResizeEnd,
    onResetInitialSize,

    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    mod,
    ...others
  } = props;

  const localRef = React.useRef<HTMLDivElement & SplitPaneHandlers>(null);

  useImperativeHandle(ref, () => ({
    ...localRef.current,
    splitPane: localRef.current,
    resetInitialSize,
    getMinWidth: () => getSizeInPixel(minWidth),
    getMinHeight: () => getSizeInPixel(minHeight),
    getMaxWidth: () => getSizeInPixel(maxWidth),
    getMaxHeight: () => getSizeInPixel(maxHeight),
    getInitialWidth: () => initialWidth,
    getInitialHeight: () => initialHeight,
    onResizeStart: () => onResizeStart && onResizeStart(),
    onResizing: (size: SPLIT_PANE_SIZE) => onResizing && onResizing(size),
    onResizeEnd: (size: SPLIT_PANE_SIZE) => onResizeEnd && onResizeEnd(size),
  }));

  const initialWithRef = React.useRef<number | string>(null);
  const initialHeightRef = React.useRef<number | string>(null);

  useEffect(() => {
    initialWithRef.current = getInitialVerticalSize();
    initialHeightRef.current = getInitialHorizontalSize();

    localRef.current.style.width = withPx(getInitialVerticalSize());
    localRef.current.style.height = withPx(getInitialHorizontalSize());
  }, [localRef.current]);

  useEffect(() => {
    localRef.current.style.width = withPx(getInitialVerticalSize());
    localRef.current.style.height = withPx(getInitialHorizontalSize());
  }, [ctx.orientation]);

  /**
   * Returns the size of the pane based on the size and parent when the size is a percentage
   *
   * @param size
   * @param parent
   * @returns
   */
  const getSizeInPixel = (size?: number | string): number => {
    if (size) {
      if (typeof size === 'number') {
        return size;
      }

      if (typeof size === 'string' && size.toString().includes('px')) {
        const value = parseFloat(size.toString());
        return value;
      }

      if (typeof size === 'string' && size.toString().includes('%')) {
        const value = parseFloat(size.toString());
        const parent = ctx.orientation === 'vertical' ? 'width' : 'height';
        const parentSize = localRef.current.parentElement.getBoundingClientRect()[parent];
        return (parentSize * value) / 100;
      }
    }
  };

  /**
   * Returns the size of the pane in pixels
   * If the size is a number, it returns the size in pixels
   * If the size is a string, it returns the size in pixels if it contains 'px'
   *
   * @param value
   * @returns
   */
  function withPx(value: number | string) {
    if (typeof value === 'number') {
      return `${value}px`;
    }

    if (typeof value === 'string') {
      if (value.includes('px')) {
        return value;
      }
    }
    return value;
  }

  function getInitialVerticalSize() {
    if (ctx.orientation === 'vertical') {
      const currentWidth = localRef.current.getBoundingClientRect().width;

      if (!initialWidth && !minWidth) {
        return currentWidth;
      }

      if (initialWidth && !minWidth) {
        return getSizeInPixel(initialWidth);
      }

      if (!initialWidth && minWidth) {
        return getSizeInPixel(minWidth);
      }

      if (initialWidth && minWidth) {
        return Math.max(getSizeInPixel(initialWidth), getSizeInPixel(minWidth));
      }
    }
    return 'auto';
  }

  function getInitialHorizontalSize() {
    if (ctx.orientation === 'horizontal') {
      const currentHeight = localRef.current.getBoundingClientRect().height;

      if (!initialHeight && !minHeight) {
        return currentHeight;
      }

      if (initialHeight && !minHeight) {
        return getSizeInPixel(initialHeight);
      }

      if (!initialHeight && minHeight) {
        return getSizeInPixel(minHeight);
      }

      if (initialHeight && minHeight) {
        return Math.max(getSizeInPixel(initialHeight), getSizeInPixel(minHeight));
      }
    }
    return 'auto';
  }

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

  /**
   * Reset the initial size of the pane to its default value
   * This is used when the user double clicks on the pane
   * It will set the width or height of the pane to its initial value
   * This is useful when the user wants to reset the size of the pane to its default value
   * @param e - The event object
   * @returns void
   */
  const resetInitialSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!localRef.current) {
      return;
    }

    if (ctx.orientation === 'vertical') {
      localRef.current.style.width = withPx(initialWithRef.current);
    }

    if (ctx.orientation === 'horizontal') {
      localRef.current.style.height = withPx(initialHeightRef.current);
    }

    if (onResetInitialSize) {
      onResetInitialSize(e);
    }
  };

  return (
    <Box
      ref={localRef}
      // w={ctx.orientation === 'vertical' ? initialWidth || minWidth : undefined}
      // h={ctx.orientation === 'horizontal' ? initialHeight || minHeight : undefined}
      mod={{ orientation: ctx.orientation }}
      {...others}
      {...getStyles('root')}
    >
      {children}
    </Box>
  );
});

SplitPane.classes = classes;
SplitPane.displayName = 'SplitPane';
