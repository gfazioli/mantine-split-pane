import type { SplitPaneFactory } from '@gfazioli/mantine-split-pane';
import type { StylesApiData } from '../components/styles-api.types';

export const SplitPaneStylesApi: StylesApiData<SplitPaneFactory> = {
  selectors: {
    pane: 'Root element',
  },

  vars: {
    root: {
      '--split-fluid': 'Controls animation `perspective`',
    },
  },

  modifiers: [{ modifier: 'data-mode', selector: 'pane', value: 'horizontal | vertical' }],
};
