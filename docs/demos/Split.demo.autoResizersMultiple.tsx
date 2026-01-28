import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';

function Demo() {
  return (
    <Split autoResizers w="100%" h={400}>
      <Split.Pane minWidth={100} initialWidth={150}>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Pane minWidth={100} initialWidth={200}>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 2</Title>
        </Paper>
      </Split.Pane>

      <Split.Pane grow>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 3 (Grow)</Title>
        </Paper>
      </Split.Pane>

      <Split.Pane minWidth={100} initialWidth={180}>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 4</Title>
        </Paper>
      </Split.Pane>

      <Split.Pane minWidth={100} initialWidth={150}>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 5</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

function Demo() {
  return (
    <Split autoResizers w="100%" h={400}>
      <Split.Pane minWidth={100} initialWidth={150}>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Pane minWidth={100} initialWidth={200}>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 2</Title>
        </Paper>
      </Split.Pane>

      <Split.Pane grow>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 3 (Grow)</Title>
        </Paper>
      </Split.Pane>

      <Split.Pane minWidth={100} initialWidth={180}>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 4</Title>
        </Paper>
      </Split.Pane>

      <Split.Pane minWidth={100} initialWidth={150}>
        <Paper withBorder w="100%" h="100%">
          <Title order={3}>Pane 5</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

export const autoResizersMultiple: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
