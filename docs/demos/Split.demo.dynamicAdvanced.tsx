import { useState } from 'react';
import { PaneConfig, Split } from '@gfazioli/mantine-split-pane';
import { Button, Code, Group, Paper, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { Split, PaneConfig } from '@gfazioli/mantine-split-pane';
import { Button, Code, Group, Paper, Title } from '@mantine/core';

function Demo() {
  const [paneCount, setPaneCount] = useState(3);

  const panes: PaneConfig[] = Array.from({ length: 5 }, (_, i) => ({
    id: \`pane-\${i + 1}\`,
    initialWidth: i === 2 ? undefined : 150,
    grow: i === 2,
    content: (
      <Paper withBorder w="100%" h="100%">
        <Title order={3}>Pane {i + 1}</Title>
        <p>{i === 2 ? 'Growing pane' : 'Fixed width'}</p>
      </Paper>
    ),
    resizerProps: i % 2 === 0 ? { variant: 'dotted' } : undefined,
  }));

  return (
    <>
      <Split w="100%" h={400}>
        {Split.Dynamic({
          panes,
          filter: (pane) => parseInt(pane.id.split('-')[1]) <= paneCount,
        })}
      </Split>
      <Group mt="md" justify="center">
        <Button
          onClick={() => setPaneCount((c) => Math.max(2, c - 1))}
          disabled={paneCount <= 2}
        >
          Remove Pane
        </Button>
        <Code>Active Panes: {paneCount}</Code>
        <Button
          onClick={() => setPaneCount((c) => Math.min(5, c + 1))}
          disabled={paneCount >= 5}
        >
          Add Pane
        </Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [paneCount, setPaneCount] = useState(3);

  const panes: PaneConfig[] = Array.from({ length: 5 }, (_, i) => ({
    id: `pane-${i + 1}`,
    initialWidth: i === 2 ? undefined : 150,
    grow: i === 2,
    content: (
      <Paper withBorder w="100%" h="100%">
        <Title order={3}>Pane {i + 1}</Title>
        <p>{i === 2 ? 'Growing pane' : 'Fixed width'}</p>
      </Paper>
    ),
    resizerProps: i % 2 === 0 ? { variant: 'dotted' } : undefined,
  }));

  return (
    <>
      <Split w="100%" h={400}>
        {Split.Dynamic({
          panes,
          filter: (pane) => parseInt(pane.id.split('-')[1], 10) <= paneCount,
        })}
      </Split>
      <Group mt="md" justify="center">
        <Button onClick={() => setPaneCount((c) => Math.max(2, c - 1))} disabled={paneCount <= 2}>
          Remove Pane
        </Button>
        <Code>Active Panes: {paneCount}</Code>
        <Button onClick={() => setPaneCount((c) => Math.min(5, c + 1))} disabled={paneCount >= 5}>
          Add Pane
        </Button>
      </Group>
    </>
  );
}

export const dynamicAdvanced: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
