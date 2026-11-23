import { Split, type SplitPaneHandlers } from '@gfazioli/mantine-split-pane';
import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useRef, useState } from 'react';

function Demo() {
  const paneRef = useRef<SplitPaneHandlers>(null);
  const [width, setWidth] = useState<number | null>(null);

  return (
    <Stack>
      <Group>
        <Button onClick={(event) => paneRef.current?.resetInitialSize?.(event)}>
          Reset Pane 1
        </Button>
        <Button
          variant="default"
          onClick={() =>
            setWidth(paneRef.current?.splitPane?.getBoundingClientRect().width ?? null)
          }
        >
          Measure Pane 1
        </Button>
        {width !== null && <Text size="sm">Pane 1 is {Math.round(width)}px wide</Text>}
      </Group>
      <Split>
        <Split.Pane ref={paneRef} initialWidth={200} minWidth={120}>
          <Paper withBorder>
            <Title order={4}>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper withBorder>
            <Title order={4}>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}

const code = `
import { Split, type SplitPaneHandlers } from '@gfazioli/mantine-split-pane';
import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useRef, useState } from 'react';

function Demo() {
  const paneRef = useRef<SplitPaneHandlers>(null);
  const [width, setWidth] = useState<number | null>(null);

  return (
    <Stack>
      <Group>
        <Button onClick={(event) => paneRef.current?.resetInitialSize?.(event)}>
          Reset Pane 1
        </Button>
        <Button
          variant="default"
          onClick={() =>
            setWidth(paneRef.current?.splitPane?.getBoundingClientRect().width ?? null)
          }
        >
          Measure Pane 1
        </Button>
        {width !== null && <Text size="sm">Pane 1 is {Math.round(width)}px wide</Text>}
      </Group>
      <Split>
        <Split.Pane ref={paneRef} initialWidth={200} minWidth={120}>
          <Paper withBorder>
            <Title order={4}>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper withBorder>
            <Title order={4}>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const paneRef: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
