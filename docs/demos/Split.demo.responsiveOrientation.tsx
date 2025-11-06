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
      <Split w="100%" h={320} orientation={{ base: 'horizontal', md: 'vertical' }}>
        <Split.Pane>
          <Paper {...paperProps}>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper {...paperProps}>
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
      <Split w="100%" h={320} orientation={{ base: 'horizontal', md: 'vertical' }}>
        <Split.Pane>
          <Paper {...paperProps}>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper {...paperProps}>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const responsiveOrientation: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
