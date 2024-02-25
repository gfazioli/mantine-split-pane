import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <Split>
      <Split.Pane initialWidth={300}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Split orientation="horizontal">
          <Split.Pane>
            <Paper withBorder w="100%" mih="100%">
              <h1>Pane 2</h1>
            </Paper>
          </Split.Pane>

          <Split.Pane>
            <Paper withBorder w="100%" mih="100%">
              <h1>Pane 3</h1>
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
    <Split>
      <Split.Pane initialWidth={300}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Split orientation="horizontal">
          <Split.Pane>
            <Paper withBorder w="100%" mih="100%">
              <h1>Pane 2</h1>
            </Paper>
          </Split.Pane>

          <Split.Pane>
            <Paper withBorder w="100%" mih="100%">
              <h1>Pane 3</h1>
            </Paper>
          </Split.Pane>
        </Split>
      </Split.Pane>
    </Split>
  );
}
`;

export const nested: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
