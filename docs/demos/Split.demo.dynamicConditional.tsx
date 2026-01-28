import { useState } from 'react';
import { PaneConfig, Split } from '@gfazioli/mantine-split-pane';
import { Button, Group, Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { Split, PaneConfig } from '@gfazioli/mantine-split-pane';
import { Button, Group, Paper } from '@mantine/core';

function Demo() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  const panes: PaneConfig[] = [
    {
      id: 'sidebar',
      initialWidth: 200,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Sidebar</h1>
          <p>Collapsible sidebar</p>
        </Paper>
      ),
    },
    {
      id: 'main',
      grow: true,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Main Content</h1>
          <p>This pane is always visible</p>
        </Paper>
      ),
    },
    {
      id: 'info',
      initialWidth: 250,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Info Panel</h1>
          <p>Collapsible info panel</p>
        </Paper>
      ),
    },
  ];

  const filter = (pane: PaneConfig) => {
    if (pane.id === 'sidebar') return showSidebar;
    if (pane.id === 'info') return showInfo;
    return true;
  };

  return (
    <>
      <Split w="100%" h={400}>
        {Split.Dynamic({ panes, filter })}
      </Split>
      <Group mt="md" justify="center">
        <Button onClick={() => setShowSidebar((s) => !s)}>
          {showSidebar ? 'Hide' : 'Show'} Sidebar
        </Button>
        <Button onClick={() => setShowInfo((s) => !s)}>
          {showInfo ? 'Hide' : 'Show'} Info
        </Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  const panes: PaneConfig[] = [
    {
      id: 'sidebar',
      initialWidth: 200,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Sidebar</h1>
          <p>Collapsible sidebar</p>
        </Paper>
      ),
    },
    {
      id: 'main',
      grow: true,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Main Content</h1>
          <p>This pane is always visible</p>
        </Paper>
      ),
    },
    {
      id: 'info',
      initialWidth: 250,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Info Panel</h1>
          <p>Collapsible info panel</p>
        </Paper>
      ),
    },
  ];

  const filter = (pane: PaneConfig) => {
    if (pane.id === 'sidebar') {
      return showSidebar;
    }
    if (pane.id === 'info') {
      return showInfo;
    }
    return true;
  };

  return (
    <>
      <Split w="100%" h={400}>
        {Split.Dynamic({ panes, filter })}
      </Split>
      <Group mt="md" justify="center">
        <Button onClick={() => setShowSidebar((s) => !s)}>
          {showSidebar ? 'Hide' : 'Show'} Sidebar
        </Button>
        <Button onClick={() => setShowInfo((s) => !s)}>{showInfo ? 'Hide' : 'Show'} Info</Button>
      </Group>
    </>
  );
}

export const dynamicConditional: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
