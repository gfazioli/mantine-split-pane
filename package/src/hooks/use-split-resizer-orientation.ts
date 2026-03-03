import type {
  SplitResizerOrientation,
  SplitResizerOrientationValue,
} from '../Resizer/SplitResizer';
import { useResponsiveValue } from './use-responsive-value';

/**
 * Resolves the split orientation from either a static string (`'vertical'` / `'horizontal'`)
 * or a responsive breakpoint object (e.g. `{ base: 'horizontal', sm: 'vertical' }`).
 * When a breakpoint object is provided, Mantine's `useMatches` hook selects the
 * value matching the current viewport width.
 *
 * @param orientation - A static orientation string or a Mantine breakpoint map
 * @returns The resolved orientation for the current viewport
 */
export function useSplitResizerOrientation(
  orientation: SplitResizerOrientation
): SplitResizerOrientationValue {
  return useResponsiveValue<SplitResizerOrientationValue>(orientation, 'vertical');
}
