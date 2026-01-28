import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Split autoResizers variant="dotted" size="lg" color="blue" w="100%" h={400}>
      <Split.Pane initialWidth="30%">
        <Paper withBorder w="100%" h="100%">
          <h1>Sidebar</h1>
          <p>30% width pane</p>
        </Paper>
      </Split.Pane>
      <Split.Pane grow>
        <Paper withBorder w="100%" h="100%">
          <h1>Main Content</h1>
          <p>All resizers inherit dotted variant from Split component</p>
        </Paper>
      </Split.Pane>
      <Split.Pane initialWidth="25%">
        <Paper withBorder w="100%" h="100%">
          <h1>Info Panel</h1>
          <p>25% width pane</p>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Paper } from '@mantine/core';
import { Split } from '@gfazioli/mantine-split-pane';

function Demo() {
  return (
    <Split autoResizers variant="dotted" size="lg" color="blue" w="100%" h={400}>
      <Split.Pane initialWidth="30%">
        <Paper withBorder w="100%" h="100%">
          <h1>Sidebar</h1>
          <p>30% width pane</p>
        </Paper>
      </Split.Pane>
      <Split.Pane grow>
        <Paper withBorder w="100%" h="100%">
          <h1>Main Content</h1>
          <p>All resizers inherit dotted variant from Split component</p>
        </Paper>
      </Split.Pane>
      <Split.Pane initialWidth="25%">
        <Paper withBorder w="100%" h="100%">
          <h1>Info Panel</h1>
          <p>25% width pane</p>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const autoResizersWithCustomProps: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
