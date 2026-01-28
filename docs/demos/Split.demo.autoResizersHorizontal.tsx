import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Split autoResizers orientation="horizontal" h={400}>
      <Split.Pane initialHeight={150}>
        <Paper withBorder w="100%" h="100%">
          <h1>Top Pane</h1>
          <p>Fixed height pane at the top</p>
        </Paper>
      </Split.Pane>

      <Split.Pane grow>
        <Paper withBorder w="100%" h="100%">
          <h1>Middle Pane</h1>
          <p>Growing pane in the middle</p>
        </Paper>
      </Split.Pane>

      <Split.Pane initialHeight={150}>
        <Paper withBorder w="100%" h="100%">
          <h1>Bottom Pane</h1>
          <p>Fixed height pane at the bottom</p>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

function Demo() {
  return (
    <Split autoResizers orientation="horizontal" h={400}>
      <Split.Pane initialHeight={150}>
        <Paper withBorder w="100%" h="100%">
          <h1>Top Pane</h1>
          <p>Fixed height pane at the top</p>
        </Paper>
      </Split.Pane>

      <Split.Pane grow>
        <Paper withBorder w="100%" h="100%">
          <h1>Middle Pane</h1>
          <p>Growing pane in the middle</p>
        </Paper>
      </Split.Pane>

      <Split.Pane initialHeight={150}>
        <Paper withBorder w="100%" h="100%">
          <h1>Bottom Pane</h1>
          <p>Fixed height pane at the bottom</p>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

export const autoResizersHorizontal: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
