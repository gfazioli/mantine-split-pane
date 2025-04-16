import React from 'react';
import { Paper } from '@mantine/core';
import { Split, SplitProps } from '../Split';
import { type SplitPaneProps } from './SplitPane';

export default {
  title: 'SplitPane',
  args: {
    orientation: 'vertical',
    grow: false,
    initialWidth: undefined,
    initialHeight: undefined,
    minWidth: undefined,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
  },
  argTypes: {
    grow: { control: { type: 'boolean' } },
    initialWidth: { control: { type: 'range', min: 0, max: 1000, step: 1 } },
    initialHeight: { control: { type: 'range', min: 0, max: 1000, step: 1 } },
    minWidth: { control: { type: 'range', min: 0, max: 1000, step: 1 } },
    minHeight: { control: { type: 'range', min: 0, max: 1000, step: 1 } },
    maxWidth: { control: { type: 'range', min: 0, max: 1000, step: 1 } },
    maxHeight: { control: { type: 'range', min: 0, max: 1000, step: 1 } },

    orientation: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
    },
  },
};

export const Usage = (props: SplitPaneProps & Partial<SplitProps>) => {
  const { orientation, ...others } = props;

  return (
    <div style={{ padding: 40 }}>
      <Split orientation={orientation}>
        <Split.Pane {...others}>
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
};

export const VerticalAfterGrow = (props: SplitPaneProps & Partial<SplitProps>) => {
  const { orientation, ...others } = props;

  return (
    <div style={{ padding: 40 }}>
      <Split orientation={orientation}>
        <Split.Pane {...others}>
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
};
