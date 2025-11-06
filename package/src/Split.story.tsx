import React, { useState } from 'react';
import { Box, Button, Code, Paper, Space, Stack, Title } from '@mantine/core';
import { SPLIT_PANE_RESIZE_SIZES } from './Resizer/SplitResizer';
import { Split, type SplitProps } from './Split';

export default {
  title: 'Split',
  args: {
    inline: false,
    spacing: 'xs',

    orientation: 'vertical',
    variant: 'default',
    size: 'sm',
    radius: 'xl',
    opacity: 0.8,
    color: undefined,
    hoverColor: undefined,

    withKnob: false,
    knobSize: 'sm',
    knobOpacity: 0.8,
    knobRadius: 'xl',
    knobColor: undefined,
    knobHoverColor: undefined,
    knobAlwaysOn: true,
    cursorVertical: undefined,
    cursorHorizontal: undefined,
  },
  argTypes: {
    inline: { control: { type: 'boolean' } },

    orientation: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'filled', 'outline', 'transparent', 'dotted', 'dashed'],
    },
    withKnob: { control: { type: 'boolean' } },
    knobAlwaysOn: { control: { type: 'boolean' } },

    size: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    radius: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    knobSize: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    spacing: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: { control: { type: 'color' } },
    hoverColor: { control: { type: 'color' } },
    knobColor: { control: { type: 'color' } },
    knobHoverColor: { control: { type: 'color' } },
    knobOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    knobRadius: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    cursorVertical: {
      control: { type: 'select' },
      options: [
        'row-resize',
        'col-resize',
        'ew-resize',
        'ns-resize',
        'nesw-resize',
        'nwse-resize',
        'all-scroll',
        'auto',
        'crosshair',
        'default',
        'help',
        'move',
        'pointer',
        'text',
        'wait',
      ],
    },
    cursorHorizontal: {
      control: { type: 'select' },
      options: [
        'row-resize',
        'col-resize',
        'ew-resize',
        'ns-resize',
        'nesw-resize',
        'nwse-resize',
        'all-scroll',
        'auto',
        'crosshair',
        'default',
        'help',
        'move',
        'pointer',
        'text',
        'wait',
      ],
    },
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

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function ResponsiveOrientation(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split orientation={{ base: 'horizontal', sm: 'vertical' }}>
        <Split.Pane>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function Initial(p: SplitProps) {
  return (
    <div style={{ padding: 40, height: 600, border: '1px solid red' }}>
      <Split {...p} h="100%" orientation="horizontal">
        <Split.Pane initialHeight="50%" maxHeight={600}>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth="50%" initialHeight="50%">
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function SimpleUsageWidth(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p} w="100%">
        <Split.Pane minWidth={200} initialWidth={300}>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function SimpleUsageWidthMax(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p} w="100%">
        <Split.Pane w={{ base: 200, xs: 'auto', sm: 'auto' }}>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function SimpleMinUsage(p: SplitProps) {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState<SPLIT_PANE_RESIZE_SIZES>();
  const [resizing, setResizing] = useState<SPLIT_PANE_RESIZE_SIZES>();

  return (
    <div style={{ padding: 40 }}>
      <Split {...p} orientation="horizontal" h={1000}>
        <Split.Pane initialHeight={300} minHeight={200} maxHeight="60%">
          <Paper withBorder w="100%" h="100%">
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
          <Paper withBorder w="100%" h="100%">
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
    </div>
  );
}

export function SimpleThreeUsage(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p} w="100%">
        <Split.Pane minWidth={200} initialWidth={300}>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow minWidth={80}>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane minWidth={300}>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 3</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function SimpleThreePercentage(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p}>
        <Split.Pane minWidth={200} initialWidth="25%">
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane minWidth={200} initialWidth="50%">
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer variant="dotted" />

        <Split.Pane minWidth={200} initialWidth="25%">
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 3</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function Styling() {
  return (
    <div style={{ padding: 40 }}>
      <Split radius={256}>
        <Split.Pane>
          <Paper withBorder w="100%" h="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

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

        <Split.Resizer variant="dotted" />

        <Split.Pane>
          <Paper withBorder>
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </Box>
  );
}

export function ThreePanel() {
  return (
    <Box p={40} style={{ border: '1px solid red' }}>
      <Split style={{ border: '1px solid blue' }}>
        <Split.Pane minWidth={100} initialWidth={200}>
          <Paper withBorder w="100%">
            <h1>Pane 1</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane grow>
          <Paper withBorder w="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane minWidth={100} initialWidth={200}>
          <Paper withBorder w="100%">
            <h1>Pane 3</h1>
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

        <Split.Resizer />

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

        <Split.Resizer />

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

  /**
   * Callback function for handling resize events.
   *
   * @param {Object} params - The parameters object
   * @param {string|number} params.width - The width value from the resize event
   */
  const handleResize = ({ width }) => {
    // eslint-disable-next-line no-console
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
            // eslint-disable-next-line no-console
            onResizing={(size) => console.log('onResizing', { size })}
          >
            <Paper withBorder>
              <h1>Pane 1</h1>
            </Paper>
          </Split.Pane>

          <Split.Resizer />

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

        <Split.Resizer />

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

        <Split.Resizer />

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

        <Split.Resizer />

        <Split.Pane>
          <h1>Center</h1>
        </Split.Pane>

        <Split.Resizer />

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

        <Split.Resizer />

        <Split.Pane grow>
          <Split {...p} orientation="horizontal" w="100%">
            <Split.Pane>
              <div>
                <h1>Left</h1>
                <p>Lorem ipsum dolor sit amet, Nulla facilisi.</p>
              </div>
            </Split.Pane>

            <Split.Resizer />

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

export function Accessibility() {
  return (
    <div style={{ padding: 40 }}>
      <Split step={1} shiftStep={128}>
        <Split.Pane>
          <h1>Pane 1</h1>
        </Split.Pane>

        <Split.Resizer step={32} shiftStep={256} />
        <Split.Pane>
          <h1>Pane 2</h1>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <h1>Pane 3</h1>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function DoubleClick() {
  const [initialWidth] = React.useState(300);

  return (
    <div style={{ padding: 40 }}>
      <Split>
        <Split.Pane
          initialWidth={initialWidth}
          // eslint-disable-next-line no-console
          onResetInitialSize={() => console.log('reset')}
        >
          <h1>Pane 1</h1>
        </Split.Pane>

        <Split.Resizer
          // eslint-disable-next-line no-console
          onDoubleClick={() => console.log('double click')}
        />

        <Split.Pane>
          <h1>Pane 2</h1>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function Events() {
  const [initialWidth] = React.useState(300);

  return (
    <div style={{ padding: 40 }}>
      <Split>
        <Split.Pane
          initialWidth={initialWidth}
          // eslint-disable-next-line no-console
          onResizeStart={() => console.log('PANE before: resize start')}
          // eslint-disable-next-line no-console
          onResizing={(s) => console.log('PANE before: resizing', s)}
          // eslint-disable-next-line no-console
          onResizeEnd={(s) => console.log('PANE before: resize end', s)}
          // eslint-disable-next-line no-console
          onResetInitialSize={() => console.log('PANE before: reset')}
        >
          <h1>Pane 1</h1>
        </Split.Pane>

        <Split.Resizer
          // eslint-disable-next-line no-console
          onResizeStart={() => console.log('Resizer: resize start')}
          // eslint-disable-next-line no-console
          onResizing={(s) => console.log('Resizer: resizing', s)}
          // eslint-disable-next-line no-console
          onResizeEnd={(s) => console.log('Resizer: resize end', s)}
          // eslint-disable-next-line no-console
          onDoubleClick={() => console.log('Resizer:double click')}
        />

        <Split.Pane
          // eslint-disable-next-line no-console
          onResizeStart={() => console.log('PANE after: resize start')}
          // eslint-disable-next-line no-console
          onResizing={(s) => console.log('PANE after: resizing', s)}
          // eslint-disable-next-line no-console
          onResizeEnd={(s) => console.log('PANE after: resize end', s)}
          // eslint-disable-next-line no-console
          onResetInitialSize={() => console.log('PANE after: reset')}
        >
          <h1>Pane 2</h1>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function ResizeWindow() {
  return (
    <Split w="100%">
      <Split.Pane initialWidth={200}>Left</Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>Right</Split.Pane>
    </Split>
  );
}
