import { Split } from '@gfazioli/mantine-split-pane';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <Split>
      <Split.Pane {...props}>
        <h1>Left pane</h1>
      </Split.Pane>

      <Split.Pane>
        <h1>Right pane</h1>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';

function Demo() {
  return (
    <Split>
      <Split.Pane{{props}}>
        <h1>Left pane</h1>
      </Split.Pane>

      <Split.Pane>
        <h1>Right pane</h1>
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
      prop: 'grow',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'mode',
      type: 'select',
      data: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      initialValue: 'vertical',
      libraryValue: 'vertical',
    },
    {
      prop: 'minWidth',
      type: 'number',
      max: 512,
      initialValue: 20,
      libraryValue: 20,
    },
    {
      prop: 'maxWidth',
      type: 'number',
      max: 512,
      initialValue: 300,
      libraryValue: 300,
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'xs',
      libraryValue: 'xs',
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
  ],
};
