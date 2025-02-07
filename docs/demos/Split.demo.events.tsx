import { useState } from 'react';
import { Split } from '@gfazioli/mantine-split-pane';
import { Code, Paper, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState('');
  const [resizing, setResizing] = useState('');

  return (
    <Stack>
      <Split {...props}>
        <Split.Pane
          onResizeStart={() => {
            setStart(true);
            setEnd('');
          }}
          onResizeEnd={({ width, height }) => {
            setStart(false);
            setEnd(`w=${width}, h=${height}`);
          }}
          onResizing={({ width, height }) => setResizing(`w=${width}, h=${height}`)}
        >
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

      <Code>Start: {start ? 'true' : 'false'}</Code>
      <Code>End: {end}</Code>
      <Code>Resizing: {resizing}</Code>
    </Stack>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';

function Demo() {
  return (
    <Stack>
      <Split{{props}}>
        <Split.Pane
          onResizeStart={() => {
            setStart(true);
            setEnd(false);
          }}
          onResizeEnd={() => {
            setStart(false);
            setEnd(true);
          }}
          onResizing={(w: string, h: string) => setResizing(\`w=\${w}, h=\${h}\`)}
        >
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

      <Code>Start: {start ? 'true' : 'false'}</Code>
      <Code>End: {end ? 'true' : 'false'}</Code>
      <Code>Resizing: {resizing}</Code>
    </Stack>
}
`;

export const events: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
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
