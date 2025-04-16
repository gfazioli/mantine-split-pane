import React from 'react';
import { Flex } from '@mantine/core';
import { SplitPaneResizer, type SplitPaneResizerProps } from './SplitPaneResizer';

export default {
  title: 'SplitPaneResizer',
  args: {
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

    spacing: 'xs',
    knobAlwaysOn: true,

    cursorVertical: undefined,
    cursorHorizontal: undefined,
  },
  argTypes: {
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

export function Usage(props: SplitPaneResizerProps) {
  return (
    <Flex w={100} h={100}>
      <SplitPaneResizer {...props} />
    </Flex>
  );
}
