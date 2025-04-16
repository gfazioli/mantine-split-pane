import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [width, setWidth] = useLocalStorage({
    key: 'split-width',
    getInitialValueInEffect: true,
  });

  return (
    <Split>
      <Split.Pane initialWidth={+width} onResizeEnd={({ width }) => setWidth(width.toString())}>
        <Paper withBorder>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

function Demo() {
  const [width, setWidth] = useLocalStorage({ key: 'split-width', defaultValue: 'auto' });

  return (
    <Split>
      <Split.Pane initialWidth={width} onResizeEnd={({ width }) => setWidth(width.toString())}>
        <Paper withBorder>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const store: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
