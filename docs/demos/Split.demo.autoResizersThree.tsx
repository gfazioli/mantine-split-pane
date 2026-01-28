import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Split autoResizers w="100%" h={400}>
      <Split.Pane initialWidth={200}>
        <Paper withBorder w="100%" h="100%">
          <h1>Pane 1</h1>
          <p>First pane with fixed initial width</p>
        </Paper>
      </Split.Pane>

      <Split.Pane grow>
        <Paper withBorder w="100%" h="100%">
          <h1>Pane 2</h1>
          <p>Growing pane that fills available space</p>
        </Paper>
      </Split.Pane>

      <Split.Pane initialWidth={200}>
        <Paper withBorder w="100%" h="100%">
          <h1>Pane 3</h1>
          <p>Third pane with fixed initial width</p>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

function Demo() {
  return (
    <Split autoResizers w="100%" h={400}>
      <Split.Pane initialWidth={200}>
        <Paper withBorder w="100%" h="100%">
          <h1>Pane 1</h1>
          <p>First pane with fixed initial width</p>
        </Paper>
      </Split.Pane>

      <Split.Pane grow>
        <Paper withBorder w="100%" h="100%">
          <h1>Pane 2</h1>
          <p>Growing pane that fills available space</p>
        </Paper>
      </Split.Pane>

      <Split.Pane initialWidth={200}>
        <Paper withBorder w="100%" h="100%">
          <h1>Pane 3</h1>
          <p>Third pane with fixed initial width</p>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

export const autoResizersThree: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
