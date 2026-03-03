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
        <Split.Pane initialWidth={{ base: '100%', md: '30%' }} minWidth={{ base: 100, lg: 200 }}>
          <Paper {...paperProps}>
            <Title>Sidebar</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper {...paperProps}>
            <Title>Main Content</Title>
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
        <Split.Pane
          initialWidth={{ base: '100%', md: '30%' }}
          minWidth={{ base: 100, lg: 200 }}
        >
          <Paper {...paperProps}>
            <Title>Sidebar</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper {...paperProps}>
            <Title>Main Content</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const responsive: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
