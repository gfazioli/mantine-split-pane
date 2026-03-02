import { useMatches } from '@mantine/core';
import type { SplitResizerOrientation } from '../Resizer/SplitResizer';

/**
 * Resolves the split orientation from either a static string (`'vertical'` / `'horizontal'`)
 * or a responsive breakpoint object (e.g. `{ base: 'horizontal', sm: 'vertical' }`).
 * When a breakpoint object is provided, Mantine's `useMatches` hook selects the
 * value matching the current viewport width.
 *
 * @param orientation - A static orientation string or a Mantine breakpoint map
 * @returns The resolved orientation for the current viewport
 */
export function useSplitResizerOrientation(orientation: SplitResizerOrientation) {
  const responsiveOrientation = useMatches(typeof orientation === 'string' ? {} : orientation);

  if (typeof orientation === 'string') {
    return orientation;
  }
  return responsiveOrientation;
}
