import { Box, Button, Paper, Space, Stack } from '@mantine/core';
import React from 'react';
import { Split, type SplitProps } from './Split';

export default {
  title: 'Split',
  args: {
    inline: false,
    orientation: 'vertical',
    size: 'sm',
    opacity: 0.8,
    radius: 'xl',
    knobSize: 'sm',
    spacing: 'xs',
    withKnob: false,
    knobAlwaysOn: true,
    variant: 'default',
  },
  argTypes: {
    inline: { control: { type: 'boolean' } },
    withKnob: { control: { type: 'boolean' } },
    knobAlwaysOn: { control: { type: 'boolean' } },
    orientation: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'filled', 'outline', 'transparent', 'dotted', 'dashed'],
    },
    size: { control: { type: 'inline-radio' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    radius: { control: { type: 'inline-radio' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    knobSize: { control: { type: 'inline-radio' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    spacing: { control: { type: 'inline-radio' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: { type: 'color' } },
    hoverColor: { control: { type: 'color' } },
  },
};

export function SimpleUsage(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p}>
        <Split.Pane>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder>
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function Grow(p: SplitProps) {
  return (
    <Box p={40}>
      <Split {...p}>
        <Split.Pane>
          <Paper withBorder>
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder>
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </Box>
  );
}

export function Inline(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p}>
        <Split.Pane>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1, Split 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane grow>
          <Paper withBorder>
            <h1>Pane 2, Split 1</h1>
          </Paper>
        </Split.Pane>
      </Split>

      <Split {...p}>
        <Split.Pane>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1, Split 2</h1>
          </Paper>
        </Split.Pane>

        <Split.Pane grow>
          <Paper withBorder>
            <h1>Pane 2, Split 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function ChangeWidth(p: SplitProps) {
  const [initialWidth, setInitialWidth] = React.useState(300);

  const handleResize = ({ width }) => {
    console.log('!!!!!!', { width });

    setInitialWidth(parseInt(width, 10));
  };

  return (
    <Stack>
      <div style={{ padding: 40 }}>
        <Split {...p} spacing={2}>
          <Split.Pane
            initialWidth={initialWidth}
            onResizeEnd={handleResize}
            onResizing={(size) => console.log('onResizing', { size })}
          >
            <Paper withBorder>
              <h1>Pane 1</h1>
            </Paper>
          </Split.Pane>

          <Split.Pane grow>
            <Paper withBorder>
              <h1>Pane 2</h1>
            </Paper>
          </Split.Pane>
        </Split>
      </div>
      <Button onClick={() => setInitialWidth((w) => w + 100)}>Increase width</Button>
      <p>{initialWidth}</p>
    </Stack>
  );
}

export function Usage(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p} spacing={4}>
        <Split.Pane>
          <h1>Left</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Split.Pane>

        <Split.Pane>
          <h1>Right</h1>
          <p>
            Lorem ipsum dolor sit amet, Nulla facilisi. Nullam auctor, libero auctor bibendum
            aliquet, er
          </p>
        </Split.Pane>
      </Split>

      <Space h={20} />

      <Split {...p}>
        <Split.Pane
          pr={32}
          initialWidth={300}
          minHeight={300}
          initialHeight={500}
          minWidth={150}
          maxWidth={800}
        >
          <h1>Left</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Split.Pane>

        <Split.Pane grow>
          <h1>Right</h1>
          <p>
            Lorem ipsum dolor sit amet, Nulla facilisi. Nullam auctor, libero auctor bibendum
            aliquet, er
          </p>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function Multiple(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p}>
        <Split.Pane>
          <h1>Left</h1>
          <h2>Ops</h2>
        </Split.Pane>

        <Split.Pane>
          <h1>Center</h1>
        </Split.Pane>

        <Split.Pane w="auto">
          <h1>Right</h1>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function Nested(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p}>
        <Split.Pane>
          <h1>Left</h1>
          <h2>Ops</h2>
        </Split.Pane>

        <Split.Pane grow>
          <Split {...p} orientation="horizontal" w="100%">
            <Split.Pane>
              <div>
                <h1>Left</h1>
                <p>Lorem ipsum dolor sit amet, Nulla facilisi.</p>
              </div>
            </Split.Pane>

            <Split.Pane>
              <div>
                <h1>Right</h1>
              </div>
            </Split.Pane>
          </Split>
        </Split.Pane>
      </Split>
    </div>
  );
}
