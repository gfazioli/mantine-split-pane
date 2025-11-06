import { useMatches } from '@mantine/core';
import type { SplitResizerOrientation } from '../Resizer/SplitResizer';

export function useSplitResizerOrientation(orientation: SplitResizerOrientation) {
  if (typeof orientation === 'string') {
    return orientation;
  }

  const responsiveOrientation = useMatches(orientation);

  return responsiveOrientation;
}
