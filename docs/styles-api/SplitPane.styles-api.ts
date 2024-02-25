import type { SplitPaneFactory } from '@gfazioli/mantine-split-pane';
import type { StylesApiData } from '../components/styles-api.types';

export const SplitPaneStylesApi: StylesApiData<SplitPaneFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {},

  modifiers: [{ modifier: 'data-orientation', selector: 'root', value: 'horizontal | vertical' }],
};
