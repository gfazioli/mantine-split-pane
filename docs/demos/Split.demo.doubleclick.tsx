import { useState } from 'react';
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [initialWidth, setInitialWidth] = useState(400);

  const handleDoubleClick = () => {
    setInitialWidth(initialWidth === 400 ? 100 : 400);
  };

  return (
    <Stack>
      <Text>Double-click on the resizer to swap the initial width of the panes.</Text>
      <Split>
        <Split.Pane initialWidth={initialWidth}>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer onDoubleClick={handleDoubleClick} />

        <Split.Pane grow>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack, Text, Title } from '@mantine/core';

function Demo() {
  const [initialWidth, setInitialWidth] = useState(400);

  const handleDoubleClick = () => {
    setInitialWidth(initialWidth === 400 ? 100 : 400);
  };

  return (
    <Stack>
      <Text>Double-click on the resizer to swap the initial width of the panes.</Text>
      <Split>
        <Split.Pane initialWidth={initialWidth}>
          <Paper withBorder>
            <Title>Pane 1</Title>
          </Paper>
        </Split.Pane>

        <Split.Resizer onDoubleClick={handleDoubleClick} />

        <Split.Pane grow>
          <Paper withBorder>
            <Title>Pane 2</Title>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const doubleclick: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
