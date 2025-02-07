import { useState } from 'react';
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper() {
  const [initialWidth, setInitialWidth] = useState(200);

  const handleDoubleClick = () => {
    setInitialWidth(initialWidth === 200 ? 100 : 200);
  };

  return (
    <Stack>
      <Split>
        <Split.Pane initialWidth={initialWidth} onDoubleClick={handleDoubleClick}>
          <Paper withBorder w="100%" mih="100%">
            <h3>
              Swap
              <br />
              Double Click →
            </h3>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder w="100%" mih="100%">
            <h2>Pane 2</h2>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Button, Group, Paper, Stack } from '@mantine/core';
import { useState } from 'react';

function Demo() {
  const [initialWidth, setInitialWidth] = useState(200);

  const handleDoubleClick = () => {
    setInitialWidth(initialWidth === 200 ? 100 : 200);
  };

  return (
    <Stack>
      <Split>
        <Split.Pane initialWidth={initialWidth} onDoubleClick={handleDoubleClick}>
          <Paper withBorder w="100%" mih="100%">
            <h3>
              Swap
              <br />
              Double Click →
            </h3>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder w="100%" mih="100%">
            <h2>Pane 2</h2>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const doubleclick: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
