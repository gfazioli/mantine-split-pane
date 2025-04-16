import { Split, SplitProps } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: SplitProps) {
  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
  };

  return (
    <Split {...props}>
      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane number 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane number 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split, SplitProps } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';

function Demo() {
  const paperProps = { withBorder: true, w: '100%', h: '100%' };

  return (
    <Split {{props}}>
      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane number 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane number 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const configurator: MantineDemo = {
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
    {
      prop: 'variant',
      type: 'select',
      data: ['default', 'filled', 'outline', 'dotted', 'dashed', 'transparent'],
      initialValue: 'vertical',
      libraryValue: 'vertical',
    },
    {
      prop: 'cursorVertical',
      type: 'select',
      data: [
        'auto',
        'default',
        'none',
        'context-menu',
        'help',
        'pointer',
        'progress',
        'wait',
        'cell',
        'crosshair',
        'text',
        'vertical-text',
        'alias',
        'copy',
        'move',
        'no-drop',
        'not-allowed',
        'grab',
        'grabbing',
        'all-scroll',
        'col-resize',
        'row-resize',
        'n-resize',
        'e-resize',
        's-resize',
        'w-resize',
        'ne-resize',
        'nw-resize',
        'se-resize',
        'sw-resize',
        'ew-resize',
        'ns-resize',
        'nesw-resize',
        'nwse-resize',
        'zoom-in',
        'zoom-out',
      ],
      initialValue: 'col-resize',
      libraryValue: 'col-resize',
    },
    {
      prop: 'cursorHorizontal',
      type: 'select',
      data: [
        'auto',
        'default',
        'none',
        'context-menu',
        'help',
        'pointer',
        'progress',
        'wait',
        'cell',
        'crosshair',
        'text',
        'vertical-text',
        'alias',
        'copy',
        'move',
        'no-drop',
        'not-allowed',
        'grab',
        'grabbing',
        'all-scroll',
        'col-resize',
        'row-resize',
        'n-resize',
        'e-resize',
        's-resize',
        'w-resize',
        'ne-resize',
        'nw-resize',
        'se-resize',
        'sw-resize',
        'ew-resize',
        'ns-resize',
        'nesw-resize',
        'nwse-resize',
        'zoom-in',
        'zoom-out',
      ],
      initialValue: 'row-resize',
      libraryValue: 'row-resize',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'spacing',
      type: 'size',
      initialValue: 'xs',
      libraryValue: 'xs',
    },
    {
      prop: 'opacity',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.1,
      initialValue: 0.8,
      libraryValue: 0.8,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'hoverColor',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'withKnob',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'knobAlwaysOn',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'knobSize',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'knobOpacity',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.1,
      initialValue: 0.5,
      libraryValue: 0.5,
    },
    {
      prop: 'knobColor',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'knobHoverColor',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
  ],
};
