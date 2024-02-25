import { Split } from '@gfazioli/mantine-split-pane';
import { Code, Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <Split>
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

      <Split.Pane color="red" initialWidth={280} maxWidth={300}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 3</h1>
          <Code>{`initialWidth={280} maxWidth={300}`}</Code>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 4</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Code, Paper } from '@mantine/core';

function Demo() {
  return (
    <Split>
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

      <Split.Pane color="red" initialWidth={280} maxWidth={300}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 3</h1>
          <Code>initialWidth={280} maxWidth={300}</Code>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 4</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const multiple: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
