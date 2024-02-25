import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <Split>
      <Split.Pane {...props}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 2</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Split>
      <Split.Pane{{props}}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 2</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const pane: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      data: ['default', 'filled', 'outline', 'dotted', 'dashed', 'transparent'],
      initialValue: 'vertical',
      libraryValue: 'vertical',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'spacing',
      type: 'size',
      initialValue: 'xs',
      libraryValue: 'xs',
    },
    {
      prop: 'opacity',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.1,
      initialValue: 0.8,
      libraryValue: 0.8,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'hoverColor',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'withKnob',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'knobAlwaysOn',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'knobSize',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'knobOpacity',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.1,
      initialValue: 0.5,
      libraryValue: 0.5,
    },
    {
      prop: 'knobColor',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'knobHoverColor',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
  ],
};
