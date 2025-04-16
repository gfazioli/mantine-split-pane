import { useState } from 'react';
import { Split } from '@gfazioli/mantine-split-pane';
import { Button, Group, Paper, Stack, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [mode, setMode] = useState<'horizontal' | 'vertical'>('vertical');

  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
  };

  return (
    <Stack>
      <Split orientation={mode}>
        <Split.Pane initialWidth={200} initialHeight={200}>
          <Paper {...paperProps}>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="40%" initialHeight={400}>
          <Paper {...paperProps}>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
      <Group>
        <Button onClick={() => setMode((c) => (c === 'horizontal' ? 'vertical' : 'horizontal'))}>
          Change orientation
        </Button>
      </Group>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Split } from '@gfazioli/mantine-split-pane';
import { Button, Group, Paper, Stack, Title } from '@mantine/core';

function Demo() {
  const [mode, setMode] = useState<'horizontal' | 'vertical'>('vertical');

  const paperProps = { withBorder: true, w: '100%', h: '100%',};

  return (
    <Stack>
      <Split orientation={mode}>
        <Split.Pane initialWidth={200} initialHeight={200}>
          <Paper {...paperProps}>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="40%" initialHeight={400}>
          <Paper {...paperProps}>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
      <Group>
        <Button onClick={() => setMode((c) => (c === 'horizontal' ? 'vertical' : 'horizontal'))}>
          Change orientation
        </Button>
      </Group>
    </Stack>
  );
}
`;

export const initials: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
