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

/**
 * Imperative handlers exposed via ref on `Split.Pane`.
 * Access them through `ref.current` after attaching a ref to a pane.
 */
export interface SplitPaneHandlers {
  /** Reset the pane to its initial size (triggered on resizer double-click) */
  resetInitialSize?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Returns the minimum width in pixels, or `undefined` if not set */
  getMinWidth?: () => number | undefined;
  /** Returns the minimum height in pixels, or `undefined` if not set */
  getMinHeight?: () => number | undefined;
  /** Returns the maximum width in pixels, or `undefined` if not set */
  getMaxWidth?: () => number | undefined;
  /** Returns the maximum height in pixels, or `undefined` if not set */
  getMaxHeight?: () => number | undefined;
  /** Returns the raw `initialWidth` prop value */
  getInitialWidth?: () => number | string | undefined;
  /** Returns the raw `initialHeight` prop value */
  getInitialHeight?: () => number | string | undefined;
  /** Notify the pane that a resize operation has started */
  onResizeStart?: () => void;
  /** Notify the pane with its current dimensions during resize */
  onResizing?: (size: SPLIT_PANE_SIZE) => void;
  /** Notify the pane with its final dimensions after resize */
  onResizeEnd?: (size: SPLIT_PANE_SIZE) => void;
  /** Direct reference to the underlying pane DOM element */
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
}

export type SplitPaneFactory = Factory<{
  props: SplitPaneProps;
  ref: HTMLDivElement;
  stylesNames: SplitPaneStylesNames;
  vars: SplitPaneCssVariables;
  variant: SplitPaneVariant;
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

  const initialWidthRef = React.useRef<number | string>(null);
  const initialHeightRef = React.useRef<number | string>(null);

  // Capture the initial sizes and apply them to the DOM on mount
  useEffect(() => {
    initialWidthRef.current = getInitialVerticalSize();
    initialHeightRef.current = getInitialHorizontalSize();

    localRef.current.style.width = withPx(getInitialVerticalSize());
    localRef.current.style.height = withPx(getInitialHorizontalSize());
  }, []);

  // Re-apply sizes when orientation or size-related props change
  useEffect(() => {
    localRef.current.style.width = withPx(getInitialVerticalSize());
    localRef.current.style.height = withPx(getInitialHorizontalSize());
  }, [ctx.orientation, initialWidth, initialHeight, minWidth, minHeight]);

  /**
   * Converts a size value (number, "px" string, or "%" string) to pixels.
   * Percentage values are resolved relative to the parent element's dimensions.
   *
   * @param size - A numeric value, a pixel string (e.g. "200px"), or a percentage string (e.g. "50%")
   * @returns The size in pixels, or `undefined` if the input is not provided
   */
  const getSizeInPixel = (size?: number | string): number | undefined => {
    if (size) {
      if (typeof size === 'number') {
        return size;
      }

      if (typeof size === 'string' && size.includes('px')) {
        return parseFloat(size);
      }

      if (typeof size === 'string' && size.includes('%')) {
        const value = parseFloat(size);
        const parentEl = localRef.current?.parentElement;

        if (!parentEl) {
          return undefined;
        }

        const dimension = ctx.orientation === 'vertical' ? 'width' : 'height';
        const parentSize = parentEl.getBoundingClientRect()[dimension];
        return (parentSize * value) / 100;
      }
    }

    return undefined;
  };

  /**
   * Ensures a size value is expressed as a CSS-compatible string.
   * Numbers are suffixed with "px"; strings already containing "px" are returned as-is.
   *
   * @param value - A numeric or string size value
   * @returns A CSS-compatible size string (e.g. "200px", "auto")
   */
  function withPx(value: number | string) {
    if (typeof value === 'number') {
      return `${value}px`;
    }

    if (typeof value === 'string' && value.includes('px')) {
      return value;
    }

    return value;
  }

  /**
   * Computes the initial width for vertical orientation.
   * Returns the resolved pixel size based on `initialWidth` and `minWidth` props,
   * falling back to the current rendered width. Returns `'auto'` for horizontal orientation.
   */
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

  /**
   * Computes the initial height for horizontal orientation.
   * Returns the resolved pixel size based on `initialHeight` and `minHeight` props,
   * falling back to the current rendered height. Returns `'auto'` for vertical orientation.
   */
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
   * Resets the pane to its initial size, restoring the width or height
   * captured on mount. Triggered by double-clicking the adjacent resizer.
   *
   * @param e - The originating mouse event from the resizer double-click
   */
  const resetInitialSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!localRef.current) {
      return;
    }

    if (ctx.orientation === 'vertical') {
      localRef.current.style.width = withPx(initialWidthRef.current);
    }

    if (ctx.orientation === 'horizontal') {
      localRef.current.style.height = withPx(initialHeightRef.current);
    }

    if (onResetInitialSize) {
      onResetInitialSize(e);
    }
  };

  return (
    <Box ref={localRef} mod={{ orientation: ctx.orientation }} {...others} {...getStyles('root')}>
      {children}
    </Box>
  );
});

SplitPane.classes = classes;
SplitPane.displayName = 'SplitPane';
