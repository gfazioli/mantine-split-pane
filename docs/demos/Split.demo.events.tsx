import { useState } from 'react';
import { Split, SPLIT_PANE_SIZE, SplitProps } from '@gfazioli/mantine-split-pane';
import { Code, Paper, Stack, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: SplitProps) {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState<SPLIT_PANE_SIZE>();
  const [resizing, setResizing] = useState<SPLIT_PANE_SIZE>();

  return (
    <Stack>
      <Split {...props}>
        <Split.Pane
          onResizeStart={() => {
            setStart(true);
          }}
          onResizeEnd={(size) => {
            setStart(false);
            setEnd(size);
          }}
          onResizing={setResizing}
        >
          <Paper withBorder w="100%" mih="100%">
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper withBorder w="100%" mih="100%">
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Stack gap={2}>
        <Code>Start: {start ? 'true' : 'false'}</Code>
        <Code>
          End (Pane 1): w={end?.width} h={end?.height}
        </Code>
        <Code>
          Resizing (Pane 1): w={resizing?.width} h={resizing?.height}
        </Code>
      </Stack>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Split, SPLIT_PANE_SIZE, SplitProps } from '@gfazioli/mantine-split-pane';
import { Code, Paper, Stack, Title } from '@mantine/core';

function Demo() {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState<SPLIT_PANE_SIZE>();
  const [resizing, setResizing] = useState<SPLIT_PANE_SIZE>()
  
  return (
    <Stack>
      <Split{{props}}>
        <Split.Pane
          onResizeStart={() => {
            setStart(true);
          }}
          onResizeEnd={(size) => {
            setStart(false);
            setEnd(size);
          }}
          onResizing={setResizing}
        >
          <Paper withBorder w="100%" mih="100%">
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper withBorder w="100%" mih="100%">
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Stack gap={2}>
        <Code>Start: {start ? 'true' : 'false'}</Code>
        <Code>
          End (Pane 1): w={end?.width} h={end?.height}
        </Code>
        <Code>
          Resizing (Pane 1): w={resizing?.width} h={resizing?.height}
        </Code>
      </Stack>
    </Stack>
}
`;

export const events: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    {
      prop: 'orientation',
      type: 'segmented',
      data: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      initialValue: 'vertical',
      libraryValue: 'vertical',
    },
  ],
};
