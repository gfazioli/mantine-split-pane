import type { SplitPaneResizerFactory } from '@gfazioli/mantine-split-pane';
import type { StylesApiData } from '../components/styles-api.types';

export const SplitPaneResizerStylesApi: StylesApiData<SplitPaneResizerFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--split-resizer-size': 'Controls resizer size',
      '--split-resizer-color': 'Controls resizer color',
      '--split-resizer-color-light': 'Controls resizer color in light mode',
      '--split-resizer-color-dark': 'Controls resizer color in dark mode',
      '--split-resizer-hover-color-light': 'Controls resizer hover color in light mode',
      '--split-resizer-hover-color-dark': 'Controls resizer hover color in dark mode',
      '--split-resizer-radius': 'Controls resizer border-radius',
      '--split-resizer-knob-size': 'Controls resizer knob size',
      '--split-resizer-knob-opacity': 'Controls resizer knob opacity',
      '--split-resizer-knob-radius': 'Controls resizer knob border-radius',
      '--split-resizer-knob-color': 'Controls resizer knob color',
      '--split-resizer-knob-hover-color': 'Controls resizer knob hover color',
      '--split-resizer-spacing': 'Controls resizer spacing',
      '--split-resizer-cursor-vertical': 'Controls resizer cursor in vertical mode',
      '--split-resizer-cursor-horizontal': 'Controls resizer cursor in horizontal mode',
    },
  },

  //modifiers: [{ modifier: 'data-mode', selector: 'pane', value: 'horizontal | vertical' }],
};
