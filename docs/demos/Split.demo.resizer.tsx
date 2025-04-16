import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Stack>
      <Split color="red" size="xl">
        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 3</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Split>
        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer color="red" size="xl" />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer color="green" size="md" />

        <Split.Pane>
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
import { Paper, Stack, Title } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Split color="red" size="xl">
        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 3</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Split>
        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer color="red" size="xl" />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer color="green" size="md" />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const resizer: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
