import { Split } from '@gfazioli/mantine-split-pane';
import { Code, Paper, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Split>
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

      <Split.Resizer variant="outline" />

      <Split.Pane initialWidth={280} maxWidth={300}>
        <Paper withBorder>
          <Title>Pane 3</Title>
          <Code>{`initialWidth={280} maxWidth={300}`}</Code>
        </Paper>
      </Split.Pane>

      <Split.Resizer color="red" />

      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 4</Title>
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

      <Split.Resizer variant="outline" />

      <Split.Pane initialWidth={280} maxWidth={300}>
        <Paper withBorder>
          <Title>Pane 3</Title>
          <Code>{\`initialWidth={280} maxWidth={300}\`}</Code>
        </Paper>
      </Split.Pane>

      <Split.Resizer color="red" />

      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 4</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const multiple: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
