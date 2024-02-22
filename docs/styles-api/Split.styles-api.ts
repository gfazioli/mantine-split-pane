import type { SplitFactory } from '@gfazioli/mantine-split-pane';
import type { StylesApiData } from '../components/styles-api.types';

export const SplitStylesApi: StylesApiData<SplitFactory> = {
  selectors: {
    root: 'Root element',
    resizer: 'Inner element',
  },

  vars: {
    root: {
      '--split-fluid': 'Controls animation `perspective`',
    },
  },

  modifiers: [{ modifier: 'data-mode', selector: 'root', value: 'horizontal | vertical' }],
};
