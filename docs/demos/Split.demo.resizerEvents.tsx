import { useState } from 'react';
import { Split, SPLIT_PANE_RESIZE_SIZES, SplitProps } from '@gfazioli/mantine-split-pane';
import { Code, Paper, Stack, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: SplitProps) {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState<SPLIT_PANE_RESIZE_SIZES>();
  const [resizing, setResizing] = useState<SPLIT_PANE_RESIZE_SIZES>();

  return (
    <Stack>
      <Split {...props}>
        <Split.Pane>
          <Paper withBorder w="100%" mih="100%">
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer
          onResizeStart={() => {
            setStart(true);
          }}
          onResizeEnd={(sizes) => {
            setStart(false);
            setEnd(sizes);
          }}
          onResizing={setResizing}
        />

        <Split.Pane grow>
          <Paper withBorder w="100%" mih="100%">
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Stack gap={2}>
        <Code>Start: {start ? 'true' : 'false'}</Code>
        <Code>
          End (beforePanePane 1): w={end?.beforePane.width} h={end?.beforePane.height}
        </Code>
        <Code>
          End (afterPanePane 1): w={end?.afterPane.width} h={end?.afterPane.height}
        </Code>
        <Code>
          Resizing (beforePanePane 1): w={resizing?.beforePane.width} h=
          {resizing?.beforePane.height}
        </Code>
        <Code>
          Resizing (afterPanePane 1): w={resizing?.afterPane.width} h={resizing?.afterPane.height}
        </Code>
      </Stack>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Split, SPLIT_PANE_RESIZE_SIZES, SplitProps } from '@gfazioli/mantine-split-pane';
import { Code, Paper, Stack, Title } from '@mantine/core';

function Demo() {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState<SPLIT_PANE_RESIZE_SIZES>();
  const [resizing, setResizing] = useState<SPLIT_PANE_RESIZE_SIZES>();
  
  return (
    <Stack>
      <Split{{props}}>
        <Split.Pane>
          <Paper withBorder w="100%" mih="100%">
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer
          onResizeStart={() => {
            setStart(true);
          }}
          onResizeEnd={(sizes) => {
            setStart(false);
            setEnd(sizes);
          }}
          onResizing={setResizing}
        />

        <Split.Pane grow>
          <Paper withBorder w="100%" mih="100%">
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Stack gap={2}>
        <Code>Start: {start ? 'true' : 'false'}</Code>
        <Code>
          End (beforePanePane 1): w={end?.beforePane.width} h={end?.beforePane.height}
        </Code>
        <Code>
          End (afterPanePane 1): w={end?.afterPane.width} h={end?.afterPane.height}
        </Code>
        <Code>
          Resizing (beforePanePane 1): w={resizing?.beforePane.width} h=
          {resizing?.beforePane.height}
        </Code>
        <Code>
          Resizing (afterPanePane 1): w={resizing?.afterPane.width} h={resizing?.afterPane.height}
        </Code>
      </Stack>
    </Stack>
}
`;

export const resizerEvents: MantineDemo = {
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
