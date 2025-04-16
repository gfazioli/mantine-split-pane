import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Stack>
      <Text>Resize the panes, then double-click the resizer to reset their size.</Text>
      <Split>
        <Split.Pane initialWidth="50%">
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="50%">
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack, Text, Title } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Text>Resize the panes, then double-click the resizer to reset their size.</Text>
      <Split>
        <Split.Pane initialWidth="50%">
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="50%">
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const reset: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
