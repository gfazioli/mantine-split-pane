import { MantineSize, createSafeContext } from '@mantine/core';
import { SPLIT_PANE_ERRORS } from './SplitPane.errors';

interface SplitPaneContext {
  mode: 'horizontal' | 'vertical';
  size?: MantineSize;
  minWidth?: number;
}

export const [SplitPaneContextProvider, useSplitPaneContext] = createSafeContext<SplitPaneContext>(
  SPLIT_PANE_ERRORS.context
);
