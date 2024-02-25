import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <Split>
      <Split.Pane initialWidth="50%">
        <Paper withBorder w="100%" h="100%">
          <h1>P 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane {...props}>
        <Paper withBorder w="100%" h="100%">
          <h1>P 2</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Split>
      <Split.Pane initialWidth="50%">
        <Paper withBorder w="100%" h="100%">
          <h1>P 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane{{props}}>
        <Paper withBorder w="100%" h="100%">
          <h1>P 2</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const grow: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'grow',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
