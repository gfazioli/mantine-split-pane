import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper() {
  return (
    <Stack>
      <Split>
        <Split.Pane initialWidth={200}>
          <Paper withBorder w="100%" mih="100%">
            <h3>
              Resize and then
              <br />
              Double Click →
            </h3>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder w="100%" mih="100%">
            <h1>Pane 2</h1>
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
  return (
    <Stack>
      <Split>
        <Split.Pane initialWidth={200}>
          <Paper withBorder w="100%" mih="100%">
            <h3>
              Resize and then
              <br />
              Double Click →
            </h3>
          </Paper>
        </Split.Pane>

        <Split.Pane>
          <Paper withBorder w="100%" mih="100%">
            <h1>Pane 2</h1>
          </Paper>
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const reset: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
  defaultExpanded: false,
};
