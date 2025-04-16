import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
  };

  return (
    <Split>
      <Split.Pane initialWidth={300}>
        <Paper {...paperProps}>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Split orientation="horizontal">
          <Split.Pane>
            <Paper {...paperProps}>
              <Title>Pane 2</Title>
            </Paper>
          </Split.Pane>

          <Split.Resizer color="violet" />

          <Split.Pane initialHeight={200}>
            <Paper {...paperProps}>
              <Title>Pane 3</Title>
            </Paper>
          </Split.Pane>
        </Split>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';

function Demo() {
  const paperProps = { withBorder: true, w: '100%', h: '100%'};

  return (
    <Split>
      <Split.Pane initialWidth={300}>
        <Paper {...paperProps}>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Split orientation="horizontal">
          <Split.Pane>
            <Paper {...paperProps}>
              <Title>Pane 2</Title>
            </Paper>
          </Split.Pane>

          <Split.Resizer color="violet" />

          <Split.Pane initialHeight={200}>
            <Paper {...paperProps}>
              <Title>Pane 3</Title>
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
  component: Demo,
  code,
  defaultExpanded: false,
};
