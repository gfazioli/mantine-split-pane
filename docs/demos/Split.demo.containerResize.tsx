import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
  };

  return (
    <Stack>
      <Split w="100%" h={320}>
        <Split.Pane initialWidth="30%" minWidth={100}>
          <Paper {...paperProps}>
            <Title>30% Pane</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper {...paperProps}>
            <Title>Growing Pane</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="20%" minWidth={80}>
          <Paper {...paperProps}>
            <Title>20% Pane</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack, Title } from '@mantine/core';

const paperProps = { withBorder: true, w: '100%', h: '100%' };

function Demo() {
  return (
    <Stack>
      <Split w="100%" h={320}>
        <Split.Pane initialWidth="30%" minWidth={100}>
          <Paper {...paperProps}>
            <Title>30% Pane</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper {...paperProps}>
            <Title>Growing Pane</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="20%" minWidth={80}>
          <Paper {...paperProps}>
            <Title>20% Pane</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const containerResize: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
