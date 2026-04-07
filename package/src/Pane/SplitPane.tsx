import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  Factory,
  factory,
  px,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import { useResponsiveValue } from '../hooks/use-responsive-value';
import { SplitResizerVariant } from '../Resizer/SplitResizer';
import { useSplitContext } from '../Split.context';
import type { ResponsiveValue } from '../types';
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
  /** Returns the resolved `initialWidth` value for the current breakpoint */
  getInitialWidth?: () => number | string | undefined;
  /** Returns the resolved `initialHeight` value for the current breakpoint */
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

  /** Initial width of the pane. Accepts a static value or a responsive breakpoint map. */
  initialWidth?: ResponsiveValue<number | string>;

  /** Initial height of the pane. Accepts a static value or a responsive breakpoint map. */
  initialHeight?: ResponsiveValue<number | string>;

  /** The minimum width of the pane when orientation is vertical. Accepts a static value or a responsive breakpoint map. */
  minWidth?: ResponsiveValue<number | string>;

  /** The minimum height of the pane when orientation is horizontal. Accepts a static value or a responsive breakpoint map. */
  minHeight?: ResponsiveValue<number | string>;

  /** The maximum width of the pane when orientation is vertical. Accepts a static value or a responsive breakpoint map. */
  maxWidth?: ResponsiveValue<number | string>;

  /** The maximum height of the pane when orientation is horizontal. Accepts a static value or a responsive breakpoint map. */
  maxHeight?: ResponsiveValue<number | string>;

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

function isPercentageValue(size?: number | string): boolean {
  return typeof size === 'string' && size.includes('%');
}

function withPx(value: number | string) {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  if (typeof value === 'string' && value.includes('px')) {
    return value;
  }

  return value;
}

export const SplitPane = factory<SplitPaneFactory>((_props) => {
  const { ref, ...restProps } = _props as typeof _props & { ref?: React.Ref<unknown> };
  const props = useProps('Pane', defaultProps, restProps);

  const ctx = useSplitContext();

  const {
    children,
    grow,
    initialWidth: initialWidthProp,
    initialHeight: initialHeightProp,
    minWidth: minWidthProp,
    minHeight: minHeightProp,
    maxWidth: maxWidthProp,
    maxHeight: maxHeightProp,

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

  // Resolve responsive values to scalars for the current viewport
  const initialWidth = useResponsiveValue<number | string>(initialWidthProp);
  const initialHeight = useResponsiveValue<number | string>(initialHeightProp);
  const minWidth = useResponsiveValue<number | string>(minWidthProp);
  const minHeight = useResponsiveValue<number | string>(minHeightProp);
  const maxWidth = useResponsiveValue<number | string>(maxWidthProp);
  const maxHeight = useResponsiveValue<number | string>(maxHeightProp);

  const localRef = useRef<HTMLDivElement & SplitPaneHandlers>(null);

  // Track whether the pane has been manually dragged
  const hasBeenDraggedRef = useRef(false);
  // Store the ratio of the drag position relative to the container
  const dragRatioRef = useRef<number | null>(null);
  // Store the previous container size to detect changes
  const prevContainerSizeRef = useRef<{ width: number; height: number } | null>(null);

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
    onResizeEnd: (size: SPLIT_PANE_SIZE) => {
      // Store drag ratio when resize ends
      if (localRef.current && ctx.containerSize) {
        const rect = localRef.current.getBoundingClientRect();
        if (ctx.orientation === 'vertical' && ctx.containerSize.width > 0) {
          dragRatioRef.current = rect.width / ctx.containerSize.width;
          hasBeenDraggedRef.current = true;
        } else if (ctx.orientation === 'horizontal' && ctx.containerSize.height > 0) {
          dragRatioRef.current = rect.height / ctx.containerSize.height;
          hasBeenDraggedRef.current = true;
        }
      }
      onResizeEnd && onResizeEnd(size);
    },
  }));

  const initialWidthRef = useRef<number | string | null>(null);
  const initialHeightRef = useRef<number | string | null>(null);

  const getSizeInPixel = useCallback(
    (size?: number | string): number | undefined => {
      if (size === undefined || size === null) {
        return undefined;
      }

      // Handle percentage values (needs parent element measurement)
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

      // Delegate number, px, rem, em to Mantine's px() utility
      const result = px(size);
      return typeof result === 'number' && !Number.isNaN(result) ? result : undefined;
    },
    [ctx.orientation]
  );

  const getInitialVerticalSize = useCallback(() => {
    if (ctx.orientation === 'vertical') {
      const currentWidth = localRef.current?.getBoundingClientRect().width ?? 0;

      if (!initialWidth && !minWidth) {
        return currentWidth;
      }

      if (initialWidth && !minWidth) {
        return getSizeInPixel(initialWidth);
      }

      if (!initialWidth && minWidth) {
        return getSizeInPixel(minWidth!);
      }

      if (initialWidth && minWidth) {
        return Math.max(getSizeInPixel(initialWidth) ?? 0, getSizeInPixel(minWidth!) ?? 0);
      }
    }
    return 'auto';
  }, [ctx.orientation, initialWidth, minWidth, getSizeInPixel]);

  const getInitialHorizontalSize = useCallback(() => {
    if (ctx.orientation === 'horizontal') {
      const currentHeight = localRef.current?.getBoundingClientRect().height ?? 0;

      if (!initialHeight && !minHeight) {
        return currentHeight;
      }

      if (initialHeight && !minHeight) {
        return getSizeInPixel(initialHeight);
      }

      if (!initialHeight && minHeight) {
        return getSizeInPixel(minHeight!);
      }

      if (initialHeight && minHeight) {
        return Math.max(getSizeInPixel(initialHeight) ?? 0, getSizeInPixel(minHeight!) ?? 0);
      }
    }
    return 'auto';
  }, [ctx.orientation, initialHeight, minHeight, getSizeInPixel]);

  // Capture the initial sizes and apply them to the DOM on mount
  useEffect(() => {
    initialWidthRef.current = getInitialVerticalSize() ?? null;
    initialHeightRef.current = getInitialHorizontalSize() ?? null;

    if (localRef.current) {
      localRef.current.style.width = withPx(getInitialVerticalSize() ?? 'auto');
      localRef.current.style.height = withPx(getInitialHorizontalSize() ?? 'auto');
    }
  }, [getInitialVerticalSize, getInitialHorizontalSize]);

  // Re-apply sizes when orientation or size-related props change
  useEffect(() => {
    // Reset drag state when props change (user changed breakpoint or prop values)
    hasBeenDraggedRef.current = false;
    dragRatioRef.current = null;

    const newWidth = getInitialVerticalSize();
    const newHeight = getInitialHorizontalSize();

    initialWidthRef.current = newWidth ?? null;
    initialHeightRef.current = newHeight ?? null;

    if (localRef.current) {
      localRef.current.style.width = withPx(newWidth ?? 'auto');
      localRef.current.style.height = withPx(newHeight ?? 'auto');
    }
  }, [getInitialVerticalSize, getInitialHorizontalSize]);

  // Container resize tracking: recalculate percentage-based sizes
  useEffect(() => {
    if (!ctx.containerSize || !localRef.current) {
      return;
    }

    const { width: containerWidth, height: containerHeight } = ctx.containerSize;

    // Skip if container hasn't actually been measured yet
    if (containerWidth === 0 && containerHeight === 0) {
      return;
    }

    // Skip the initial measurement (let the mount effect handle it)
    if (!prevContainerSizeRef.current) {
      prevContainerSizeRef.current = { width: containerWidth, height: containerHeight };
      return;
    }

    // Skip if container size hasn't meaningfully changed (threshold of 1px)
    const prevSize = prevContainerSizeRef.current;
    const widthChanged = Math.abs(containerWidth - prevSize.width) > 1;
    const heightChanged = Math.abs(containerHeight - prevSize.height) > 1;

    if (!widthChanged && !heightChanged) {
      return;
    }

    prevContainerSizeRef.current = { width: containerWidth, height: containerHeight };

    // Don't recalculate for grow panes — they flex automatically
    if (grow) {
      return;
    }

    if (ctx.orientation === 'vertical' && widthChanged) {
      if (hasBeenDraggedRef.current && dragRatioRef.current !== null) {
        // Preserve the drag ratio on container resize, clamped to min/max constraints
        const minPx = getSizeInPixel(minWidth);
        const maxPx = getSizeInPixel(maxWidth);
        let newWidth = dragRatioRef.current * containerWidth;
        if (minPx !== undefined) {
          newWidth = Math.max(newWidth, minPx);
        }
        if (maxPx !== undefined) {
          newWidth = Math.min(newWidth, maxPx);
        }
        localRef.current.style.width = `${newWidth}px`;
      } else if (isPercentageValue(initialWidth)) {
        // Recalculate percentage-based size
        const newWidth = getSizeInPixel(initialWidth);
        if (newWidth !== undefined) {
          const minPx = getSizeInPixel(minWidth);
          const maxPx = getSizeInPixel(maxWidth);
          let finalWidth = newWidth;
          if (minPx !== undefined) {
            finalWidth = Math.max(finalWidth, minPx);
          }
          if (maxPx !== undefined) {
            finalWidth = Math.min(finalWidth, maxPx);
          }
          localRef.current.style.width = `${finalWidth}px`;
        }
      }
    }

    if (ctx.orientation === 'horizontal' && heightChanged) {
      if (hasBeenDraggedRef.current && dragRatioRef.current !== null) {
        // Preserve the drag ratio on container resize, clamped to min/max constraints
        const minPx = getSizeInPixel(minHeight);
        const maxPx = getSizeInPixel(maxHeight);
        let newHeight = dragRatioRef.current * containerHeight;
        if (minPx !== undefined) {
          newHeight = Math.max(newHeight, minPx);
        }
        if (maxPx !== undefined) {
          newHeight = Math.min(newHeight, maxPx);
        }
        localRef.current.style.height = `${newHeight}px`;
      } else if (isPercentageValue(initialHeight)) {
        // Recalculate percentage-based size
        const newHeight = getSizeInPixel(initialHeight);
        if (newHeight !== undefined) {
          const minPx = getSizeInPixel(minHeight);
          const maxPx = getSizeInPixel(maxHeight);
          let finalHeight = newHeight;
          if (minPx !== undefined) {
            finalHeight = Math.max(finalHeight, minPx);
          }
          if (maxPx !== undefined) {
            finalHeight = Math.min(finalHeight, maxPx);
          }
          localRef.current.style.height = `${finalHeight}px`;
        }
      }
    }
  }, [
    ctx.containerSize,
    ctx.orientation,
    grow,
    initialWidth,
    initialHeight,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    getSizeInPixel,
  ]);

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

    // Clear drag state on reset
    hasBeenDraggedRef.current = false;
    dragRatioRef.current = null;

    if (ctx.orientation === 'vertical') {
      // Recalculate from current percentage if applicable
      const newSize = getInitialVerticalSize();
      initialWidthRef.current = newSize ?? null;
      localRef.current.style.width = withPx(newSize ?? 'auto');
    }

    if (ctx.orientation === 'horizontal') {
      // Recalculate from current percentage if applicable
      const newSize = getInitialHorizontalSize();
      initialHeightRef.current = newSize ?? null;
      localRef.current.style.height = withPx(newSize ?? 'auto');
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
