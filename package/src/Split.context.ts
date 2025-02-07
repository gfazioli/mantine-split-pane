import { createSafeContext, MantineSpacing } from '@mantine/core';
import { SplitPaneResizerProps } from './Resizer/SplitPaneResizer';
import { SPLIT_ERRORS } from './Split.errors';

interface SplitContext
  extends Omit<
    SplitPaneResizerProps,
    | 'minWidth'
    | 'minHeight'
    | 'maxWidth'
    | 'maxHeight'
    | 'onDoubleClick'
    | 'onResizeEnd'
    | 'onResizeStart'
    | 'onResize'
    | 'paneRef'
  > {
  /** Spacing between resizer and pane */
  spacing?: MantineSpacing;
}

export const [SplitContextProvider, useSplitContext] = createSafeContext<SplitContext>(
  SPLIT_ERRORS.context
);
