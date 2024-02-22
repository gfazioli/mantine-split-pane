import { Split } from '@gfazioli/mantine-split-pane';
import { Button, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

function Wrapper(props: any) {
  const [mode, setMode] = useState<'horizontal' | 'vertical'>('vertical');

  return (
    <Split mode={mode}>
      <Split.Pane initialWidth={100} initialHeight={300} maxWidth={300}>
        <h1>Pane 1</h1>
      </Split.Pane>

      <Split.Pane>
        <Stack>
          <h1>Pane 2</h1>
          <Button onClick={() => setMode((c) => (c === 'horizontal' ? 'vertical' : 'horizontal'))}>
            Change mode
          </Button>
        </Stack>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';

function Demo() {
  const [mode, setMode] = useState<'horizontal' | 'vertical'>('vertical');

  return (
    <Split mode={mode}>
      <Split.Pane initialWidth={100} initialHeight={300} maxWidth={300}>
        <h1>Pane 1</h1>
      </Split.Pane>

      <Split.Pane>
        <Stack>
          <h1>Pane 2</h1>
          <Button onClick={() => setMode((c) => (c === 'horizontal' ? 'vertical' : 'horizontal'))}>
            Change mode
          </Button>
        </Stack>
      </Split.Pane>
    </Split>
  );
}
`;

export const initials: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
