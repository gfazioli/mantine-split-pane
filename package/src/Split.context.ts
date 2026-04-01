import { createSafeContext } from '@mantine/core';
import { SplitResizerContextProps, SplitResizerVariant } from './Resizer/SplitResizer';

/**
 * Internal context shared between `Split` and its children.
 * Extends `SplitResizerContextProps` so that resizer configuration set on the
 * parent `<Split>` automatically cascades to every `<Split.Resizer>` child.
 * The `variant` field is added here because it flows through the Mantine
 * factory system rather than through `SplitResizerContextProps`.
 */
interface SplitContext extends SplitResizerContextProps {
  /** Visual variant applied to all child resizers (e.g. `'filled'`, `'gradient'`) */
  variant?: SplitResizerVariant;

  /** Current container dimensions, updated by ResizeObserver on the root `<Split>` element */
  containerSize?: { width: number; height: number };
}

export const [SplitContextProvider, useSplitContext] = createSafeContext<SplitContext>(
  'Split component was not found in tree'
);
