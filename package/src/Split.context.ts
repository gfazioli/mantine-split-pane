import { createOptionalContext, MantineSpacing } from '@mantine/core';
import { SplitResizerContextProps, SplitResizerVariant } from './Resizer/SplitResizer';

interface SplitContext extends SplitResizerContextProps {
  /** Resizer Variant */
  variant?: SplitResizerVariant;

  /** Spacing between resizer and pane */
  spacing?: MantineSpacing;
}

export const [SplitContextProvider, useSplitContext] = createOptionalContext<SplitContext>();
