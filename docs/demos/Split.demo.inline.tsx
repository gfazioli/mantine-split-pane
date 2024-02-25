import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <>
      <Split {...props}>
        <Split.Pane>
          <Paper withBorder>
            <h1>P 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder>
            <h1>P 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
      <Split {...props}>
        <Split.Pane>
          <Paper withBorder>
            <h1>P 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder>
            <h1>P 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <>
      <Split{{props}}>
        <Split.Pane>
          <Paper withBorder>
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder>
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
      <Split>
        <Split.Pane>
          <Paper withBorder>
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder>
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </>
  );
}
`;

export const inline: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'inline',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'orientation',
      type: 'segmented',
      data: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      initialValue: 'vertical',
      libraryValue: 'vertical',
    },
  ],
};
