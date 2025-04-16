import { Split, type SplitProps } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: SplitProps) {
  return (
    <>
      <Split {...props}>
        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 1a</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 2a</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Split {...props}>
        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 1b</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 2b</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </>
  );
}

const code = `
import { Split, type SplitProps } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';

function Demo() {
  return (
    <>
      <Split
      {{props}}
      >
        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 1a</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 2a</Title>
          </Paper>
        </Split.Pane>
      </Split>

      <Split
      {{props}}
      >
        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 1b</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane>
          <Paper withBorder>
            <Title>Pane 2b</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </>
  );
}
`;

export const inline: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    {
      prop: 'inline',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
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
