import { MantineColor, MantineSize, createSafeContext } from '@mantine/core';
import { SPLIT_ERRORS } from './Split.errors';

interface SplitContext {
  mode: 'horizontal' | 'vertical';

  /** Key of `theme.colors` or any valid CSS color value, by default value depends on color scheme */
  color?: MantineColor;

  /** Highlight color on hover */
  hoverColor?: MantineColor;

  /** Resizer size */
  size?: MantineSize | number | (string & {});
}

export const [SplitContextProvider, useSplitContext] = createSafeContext<SplitContext>(
  SPLIT_ERRORS.context
);
