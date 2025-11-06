import { useMatches } from '@mantine/core';
import type { SplitResizerOrientation } from '../Resizer/SplitResizer';

export function useSplitResizerOrientation(orientation: SplitResizerOrientation) {
  const responsiveOrientation = useMatches(typeof orientation === 'string' ? {} : orientation);

  if (typeof orientation === 'string') {
    return orientation;
  }
  return responsiveOrientation;
}
