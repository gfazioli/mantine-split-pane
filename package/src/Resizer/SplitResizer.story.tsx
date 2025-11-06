import React from 'react';
import { Flex } from '@mantine/core';
import { SplitResizer, type SplitResizerProps } from './SplitResizer';

export default {
  title: 'SplitResizer',
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

export function Usage(props: SplitResizerProps) {
  return (
    <Flex w={100} h={100}>
      <SplitResizer {...props} />
    </Flex>
  );
}

export function NoProps() {
  return (
    <Flex w={100} h={100}>
      <SplitResizer />
    </Flex>
  );
}

export function Gradient() {
  return (
    <Flex w={100} h={100}>
      <SplitResizer
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 0 }}
        hoverGradient={{ from: 'red', to: 'transparent', deg: 0 }}
      />
    </Flex>
  );
}

export function ResponsiveOrientation() {
  return (
    <Flex w={100} h={100}>
      <SplitResizer orientation={{ base: 'horizontal', sm: 'vertical' }} />
    </Flex>
  );
}
