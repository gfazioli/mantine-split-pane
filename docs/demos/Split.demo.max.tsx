import { useState } from 'react';
import { Split, SPLIT_PANE_SIZE } from '@gfazioli/mantine-split-pane';
import { Button, Code, Group, Paper, Stack, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [mode, setMode] = useState<'horizontal' | 'vertical'>('vertical');

  const [firstPaneSize, setFirstPaneSize] = useState<SPLIT_PANE_SIZE>();
  const [secondPaneSize, setSecondPaneSize] = useState<SPLIT_PANE_SIZE>();

  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
  };

  return (
    <Stack>
      <Split orientation={mode}>
        <Split.Pane
          initialWidth={200}
          initialHeight={200}
          minWidth={180}
          maxWidth={300}
          onResizing={setFirstPaneSize}
        >
          <Paper {...paperProps}>
            <Title>Pane 1</Title>
            <Stack gap={2}>
              <Code>initialWidth: 200</Code>
              <Code>initialHeight: 200</Code>
              <Code>minWidth: 180</Code>
              <Code>maxWidth: 300</Code>
              <Code>Width: {firstPaneSize?.width}px</Code>
              <Code>Height: {firstPaneSize?.height}px</Code>
            </Stack>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane
          initialWidth="40%"
          initialHeight={400}
          minHeight={300}
          maxHeight={500}
          onResizing={setSecondPaneSize}
        >
          <Paper {...paperProps}>
            <Title>Pane 2</Title>
            <Stack gap={2}>
              <Code>initialWidth: 40%</Code>
              <Code>initialHeight: 400</Code>
              <Code>minHeight: 300</Code>
              <Code>maxHeight: 500</Code>
              <Code>Width: {secondPaneSize?.width}px</Code>
              <Code>Height: {secondPaneSize?.height}px</Code>
            </Stack>
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

  const [firstPaneSize, setFirstPaneSize] = useState<SPLIT_PANE_SIZE>();
  const [secondPaneSize, setSecondPaneSize] = useState<SPLIT_PANE_SIZE>();

  const paperProps = { withBorder: true, w: '100%', h: '100%' };

  return (
    <Stack>
      <Split orientation={mode}>
        <Split.Pane
          initialWidth={200}
          initialHeight={200}
          minWidth={180}
          maxWidth={300}
          onResizing={setFirstPaneSize}
        >
          <Paper {...paperProps}>
            <Title>Pane 1</Title>
            <Stack gap={2}>
              <Code>initialWidth: 200</Code>
              <Code>initialHeight: 200</Code>
              <Code>minWidth: 180</Code>
              <Code>maxWidth: 300</Code>
              <Code>Width: {firstPaneSize?.width}px</Code>
              <Code>Height: {firstPaneSize?.height}px</Code>
            </Stack>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane
          initialWidth="40%"
          initialHeight={400}
          minHeight={300}
          maxHeight={500}
          onResizing={setSecondPaneSize}
        >
          <Paper {...paperProps}>
            <Title>Pane 2</Title>
            <Stack gap={2}>
              <Code>initialWidth: 40%</Code>
              <Code>initialHeight: 400</Code>
              <Code>minHeight: 300</Code>
              <Code>maxHeight: 500</Code>
              <Code>Width: {secondPaneSize?.width}px</Code>
              <Code>Height: {secondPaneSize?.height}px</Code>
            </Stack>
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

export const max: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
