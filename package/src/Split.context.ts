import { createOptionalContext, MantineSpacing } from '@mantine/core';
import { SplitPaneResizerContextProps, SplitPaneResizerVariant } from './Resizer/SplitPaneResizer';

interface SplitContext extends SplitPaneResizerContextProps {
  /** Resizer Variant */
  variant?: SplitPaneResizerVariant;

  /** Spacing between resizer and pane */
  spacing?: MantineSpacing;
}

export const [SplitContextProvider, useSplitContext] = createOptionalContext<SplitContext>();
