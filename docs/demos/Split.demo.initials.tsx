import { Split } from '@gfazioli/mantine-split-pane';
import { Button, Group, Paper, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

function Wrapper(props: any) {
  const [mode, setMode] = useState<'horizontal' | 'vertical'>('vertical');

  return (
    <Stack>
      <Split orientation={mode}>
        <Split.Pane initialWidth={200} initialHeight={300} maxWidth={300} maxHeight={350}>
          <Paper withBorder w="100%" mih="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder w="100%" mih="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
      <Group>
        <Button onClick={() => setMode((c) => (c === 'horizontal' ? 'vertical' : 'horizontal'))}>
          Change mode
        </Button>
      </Group>
    </Stack>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Button, Group, Paper, Stack } from '@mantine/core';
import { useState } from 'react';

function Demo() {
  const [mode, setMode] = useState<'horizontal' | 'vertical'>('vertical');

  return (
    <Stack>
      <Split orientation={mode}>
        <Split.Pane initialWidth={200} initialHeight={300} maxWidth={300} maxHeight={350}>
          <Paper withBorder w="100%" mih="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder w="100%" mih="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
      <Group>
        <Button onClick={() => setMode((c) => (c === 'horizontal' ? 'vertical' : 'horizontal'))}>
          Change mode
        </Button>
      </Group>
    </Stack>
  );
}
`;

export const initials: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
