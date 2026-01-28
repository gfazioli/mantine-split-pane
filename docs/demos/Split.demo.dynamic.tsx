import { PaneConfig, Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Split, PaneConfig } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  const panes: PaneConfig[] = [
    {
      id: 'sidebar',
      initialWidth: 200,
      minWidth: 150,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Sidebar</h1>
          <p>Navigation menu</p>
        </Paper>
      ),
    },
    {
      id: 'main',
      grow: true,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Main Content</h1>
          <p>This pane grows to fill available space</p>
        </Paper>
      ),
    },
    {
      id: 'info',
      initialWidth: 250,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Info Panel</h1>
          <p>Additional information</p>
        </Paper>
      ),
    },
  ];

  return (
    <Split w="100%" h={400}>
      {Split.Dynamic({ panes })}
    </Split>
  );
}
`;

function Demo() {
  const panes: PaneConfig[] = [
    {
      id: 'sidebar',
      initialWidth: 200,
      minWidth: 150,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Sidebar</h1>
          <p>Navigation menu</p>
        </Paper>
      ),
    },
    {
      id: 'main',
      grow: true,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Main Content</h1>
          <p>This pane grows to fill available space</p>
        </Paper>
      ),
    },
    {
      id: 'info',
      initialWidth: 250,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Info Panel</h1>
          <p>Additional information</p>
        </Paper>
      ),
    },
  ];

  return (
    <Split w="100%" h={400}>
      {Split.Dynamic({ panes })}
    </Split>
  );
}

export const dynamic: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
