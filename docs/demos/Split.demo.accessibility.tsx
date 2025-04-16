import { Split, SplitProps } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: SplitProps) {
  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
    p: 'md',
  };

  return (
    <Split {...props}>
      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Split orientation="horizontal">
          <Split.Pane>
            <Paper {...paperProps}>
              <Title>Pane 1</Title>
            </Paper>
          </Split.Pane>

          <Split.Resizer step={1} color="violet" />

          <Split.Pane>
            <Paper {...paperProps}>
              <Title>Pane 2</Title>
            </Paper>
          </Split.Pane>
        </Split>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Split{{props}}>
      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Split orientation="horizontal">
          <Split.Pane>
            <Paper {...paperProps}>
              <Title>Pane 1</Title>
            </Paper>
          </Split.Pane>

          <Split.Resizer step={1} color="violet" />

          <Split.Pane>
            <Paper {...paperProps}>
              <Title>Pane 2</Title>
            </Paper>
          </Split.Pane>
        </Split>
      </Split.Pane>
    </Split>
  );
}
`;

export const accessibility: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code,
  striped: true,

  controls: [
    {
      prop: 'step',
      type: 'number',
      initialValue: 8,
      libraryValue: 128,
    },
    {
      prop: 'shiftStep',
      type: 'number',
      initialValue: 64,
      libraryValue: 128,
    },
  ],
};
