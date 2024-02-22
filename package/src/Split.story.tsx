import { Button, Space, Stack } from '@mantine/core';
import React from 'react';
import { Split, type SplitProps } from './Split';

export default {
  title: 'Split',
  args: {
    fluid: false,
    mode: 'vertical',
    size: 'xs',
    color: 'grey',
    hoverColor: 'orange',
  },
  argTypes: {
    fluid: { control: { type: 'boolean' } },
    mode: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
    },
    size: { control: { type: 'inline-radio' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: { type: 'color' } },
    hoverColor: { control: { type: 'color' } },
  },
};

export function SimpleUsage(p: SplitProps) {
  return (
    <div style={{ padding: 40 }}>
      <Split {...p}>
        <Split.Pane>
          <div>
            <h1>Left</h1>
            <h2>Ops</h2>
          </div>
        </Split.Pane>

        <Split.Pane grow>
          <div>
            <h1>Right</h1>
          </div>
        </Split.Pane>
      </Split>
    </div>
  );
}

export function ChangeWidth(p: SplitProps) {
  const [initialWidth, setInitialWidth] = React.useState(300);

  const handleResize = (width: string) => {
    console.log('width', width);

    setInitialWidth(parseInt(width, 10));
  };

  return (
    <Stack>
      <div style={{ padding: 40 }}>
        <Split {...p}>
          <Split.Pane initialWidth={initialWidth} onPaneResize={handleResize}>
            <div>
              <h1>Left</h1>
              <h2>Ops</h2>
            </div>
          </Split.Pane>

          <Split.Pane grow>
            <div>
              <h1>Right</h1>
            </div>
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
          <Split mode="horizontal" w="100%">
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
