import { Split } from '@gfazioli/mantine-split-pane';
import { Center, Paper, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { IconArrowsHorizontal, IconGripVertical } from '@tabler/icons-react';

function Demo() {
  return (
    <Split size="xl" withKnob={false}>
      <Split.Pane>
        <Paper withBorder>
          <Title order={4} ta="center" py="md">
            Pane 1
          </Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer>
        <Center h="100%">
          <IconGripVertical size={14} stroke={1.5} />
        </Center>
      </Split.Resizer>

      <Split.Pane>
        <Paper withBorder>
          <Title order={4} ta="center" py="md">
            Pane 2
          </Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer>
        <Center h="100%">
          <IconArrowsHorizontal size={14} stroke={1.5} />
        </Center>
      </Split.Resizer>

      <Split.Pane>
        <Paper withBorder>
          <Title order={4} ta="center" py="md">
            Pane 3
          </Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Center, Paper, Title } from '@mantine/core';
import { IconArrowsHorizontal, IconGripVertical } from '@tabler/icons-react';

function Demo() {
  return (
    <Split size="xl" withKnob={false}>
      <Split.Pane>
        <Paper withBorder>
          <Title order={4} ta="center" py="md">Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer>
        <Center h="100%">
          <IconGripVertical size={14} stroke={1.5} />
        </Center>
      </Split.Resizer>

      <Split.Pane>
        <Paper withBorder>
          <Title order={4} ta="center" py="md">Pane 2</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer>
        <Center h="100%">
          <IconArrowsHorizontal size={14} stroke={1.5} />
        </Center>
      </Split.Resizer>

      <Split.Pane>
        <Paper withBorder>
          <Title order={4} ta="center" py="md">Pane 3</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const resizerContent: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
