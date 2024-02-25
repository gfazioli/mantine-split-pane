import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  const [width, setWidth] = useLocalStorage({
    key: 'split-width',
    defaultValue: 'auto',
  });

  return (
    <Split>
      <Split.Pane initialWidth={width} onResizeEnd={({ width }) => setWidth(width)}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 2</h1>
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
  const [width, setWidth] = useLocalStorage({
    key: 'split-width',
    defaultValue: 'auto',
  });

  return (
    <Split>
      <Split.Pane initialWidth={width} onResizeEnd={({ width }) => setWidth(width)}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 2</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const store: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
