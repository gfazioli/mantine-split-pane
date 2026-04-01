import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Pane({ title }: { title: string }) {
  return (
    <Paper withBorder w="100%" h="100%" p="md">
      <Title order={4}>{title}</Title>
    </Paper>
  );
}

function Demo() {
  return (
    <Stack>
      <Text>
        Drag a resizer near 200, 400, or 600 pixels to snap. The first split uses
        <code> snapPoints </code>
        inherited from
        <code> Split </code>, including
        <code> autoResizers </code>.
      </Text>

      <Split autoResizers snapPoints={[200, 400, 600]} snapTolerance={20}>
        <Split.Pane initialWidth={240}>
          <Pane title="Pane 1" />
        </Split.Pane>

        <Split.Pane initialWidth={320}>
          <Pane title="Pane 2" />
        </Split.Pane>

        <Split.Pane grow>
          <Pane title="Pane 3" />
        </Split.Pane>
      </Split>

      <Text>The second split overrides the inherited snap points on the middle resizer.</Text>

      <Split snapPoints={[200, 400, 600]} snapTolerance={20}>
        <Split.Pane initialWidth={240}>
          <Pane title="Pane 1" />
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth={320}>
          <Pane title="Pane 2" />
        </Split.Pane>

        <Split.Resizer snapPoints={[450]} />

        <Split.Pane grow>
          <Pane title="Pane 3" />
        </Split.Pane>
      </Split>
    </Stack>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Stack, Text, Title } from '@mantine/core';

function Pane({ title }: { title: string }) {
  return (
    <Paper withBorder w="100%" h="100%" p="md">
      <Title order={4}>{title}</Title>
    </Paper>
  );
}

function Demo() {
  return (
    <Stack>
      <Text>
        Drag a resizer near 200, 400, or 600 pixels to snap.
      </Text>

      <Split autoResizers snapPoints={[200, 400, 600]} snapTolerance={20}>
        <Split.Pane initialWidth={240}>
          <Pane title="Pane 1" />
        </Split.Pane>

        <Split.Pane initialWidth={320}>
          <Pane title="Pane 2" />
        </Split.Pane>

        <Split.Pane grow>
          <Pane title="Pane 3" />
        </Split.Pane>
      </Split>

      <Split snapPoints={[200, 400, 600]} snapTolerance={20}>
        <Split.Pane initialWidth={240}>
          <Pane title="Pane 1" />
        </Split.Pane>

        <Split.Resizer />

        <Split.Pane initialWidth={320}>
          <Pane title="Pane 2" />
        </Split.Pane>

        <Split.Resizer snapPoints={[450]} />

        <Split.Pane grow>
          <Pane title="Pane 3" />
        </Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const snap: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
