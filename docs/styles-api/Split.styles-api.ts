import type { SplitFactory } from '@gfazioli/mantine-split-pane';
import type { StylesApiData } from '../components/styles-api.types';

export const SplitStylesApi: StylesApiData<SplitFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--split-inline': 'Make main split container inline`',
    },
  },

  modifiers: [{ modifier: 'data-orientation', selector: 'root', value: 'horizontal | vertical' }],
};
