import { Split } from '@gfazioli/mantine-split-pane';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <Split {...props}>
      <Split.Pane>
        <h1>Left or Top pane</h1>
      </Split.Pane>

      <Split.Pane>
        <h1>Right or Bottom pane</h1>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';

function Demo() {
  return (
    <Split{{props}}>
      <Split.Pane>
        <h1>Left or Top pane</h1>
      </Split.Pane>

      <Split.Pane>
        <h1>Right or Bottom pane</h1>
      </Split.Pane>
    </Split>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
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
