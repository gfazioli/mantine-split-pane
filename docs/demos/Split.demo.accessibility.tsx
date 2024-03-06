import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <Split {...props}>
      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 2</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Split orientation="horizontal">
          <Split.Pane step={1}>
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
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Split{{props}}>
      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Split orientation="horizontal">
          <Split.Pane>
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
      </Split.Pane>
    </Split>
  );
}
`;

export const accessibility: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'step',
      type: 'number',
      initialValue: 8,
      libraryValue: 128,
    },
    {
      prop: 'shiftStep',
      type: 'number',
      initialValue: 64,
      libraryValue: 128,
    },
  ],
};
