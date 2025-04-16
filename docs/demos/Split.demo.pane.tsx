import { Split, SplitPaneProps } from '@gfazioli/mantine-split-pane';
import { Code, Paper, Stack, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: SplitPaneProps) {
  return (
    <Stack>
      <Code>
        initialWidth={200} | initialWidth={300}
      </Code>
      <Split>
        <Split.Pane initialWidth={200}>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth={300}>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Code>
        initialWidth={400}, minWidth={100} | initialWidth={200}, minWidth={50}
      </Code>
      <Split>
        <Split.Pane initialWidth={400} minWidth={100}>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth={200} minWidth={50}>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Code>initialWidth="33%", maxWidth="40%"</Code>
      <Split>
        <Split.Pane initialWidth="33%" maxWidth="40%">
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="33%" maxWidth="40%">
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="33%" maxWidth="40%">
          <Paper withBorder>
            <Title>Pane 3</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Code>
        initialWidth={200} | initialWidth={300}
      </Code>
      <Split>
        <Split.Pane initialWidth={200}>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth={300}>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Code>
        initialWidth={400}, minWidth={100} | initialWidth={200}, minWidth={50}
      </Code>
      <Split>
        <Split.Pane initialWidth={400} minWidth={100}>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth={200} minWidth={50}>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Code>initialWidth="33%", maxWidth="40%"</Code>
      <Split>
        <Split.Pane initialWidth="33%" maxWidth="40%">
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="33%" maxWidth="40%">
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="33%" maxWidth="40%">
          <Paper withBorder>
            <Title>Pane 3</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const pane: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
