import { useState } from 'react';
import { Split } from '@gfazioli/mantine-split-pane';
import { Badge, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Pane({ title }: { title: string }) {
  return (
    <Paper withBorder w="100%" h="100%" p="md">
      <Title order={4}>{title}</Title>
    </Paper>
  );
}

function Demo() {
  const [snappedPoint, setSnappedPoint] = useState<number | null>(null);

  return (
    <Stack>
      <Group>
        <Text size="sm">Current snap point:</Text>
        <Badge color={snappedPoint === null ? 'gray' : 'teal'} variant="light">
          {snappedPoint === null ? 'off' : `${snappedPoint}px`}
        </Badge>
      </Group>

      <Text size="sm">
        Percentage snap points + <code>onSnap</code> callback. Try dragging slowly near 25%, 50%,
        and 75% of the split width.
      </Text>

      <Split snapPoints={['25%', '50%', '75%']} snapTolerance={24}>
        <Split.Pane initialWidth={300}>
          <Pane title="Before" />
        </Split.Pane>
        <Split.Resizer onSnap={setSnappedPoint} />
        <Split.Pane grow>
          <Pane title="After" />
        </Split.Pane>
      </Split>

      <Text size="sm">
        Relative to the <em>after</em> pane — the snap points are interpreted as the target size of
        the right pane, not the left one.
      </Text>

      <Split autoResizers snapPoints={[200, 400]} snapFrom="after" snapTolerance={20}>
        <Split.Pane initialWidth={300}>
          <Pane title="Before" />
        </Split.Pane>
        <Split.Pane grow>
          <Pane title="After — snaps to 200 / 400" />
        </Split.Pane>
      </Split>

      <Text size="sm">
        Responsive snap sets via Mantine breakpoints. Resize the viewport to see different snap
        points kick in.
      </Text>

      <Split autoResizers snapPoints={{ base: [200, 400], md: [250, 500, 750] }} snapTolerance={20}>
        <Split.Pane initialWidth={300}>
          <Pane title="Before" />
        </Split.Pane>
        <Split.Pane grow>
          <Pane title="After" />
        </Split.Pane>
      </Split>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Split } from '@gfazioli/mantine-split-pane';
import { Badge, Group, Paper, Stack, Text, Title } from '@mantine/core';

function Demo() {
  const [snappedPoint, setSnappedPoint] = useState<number | null>(null);

  return (
    <Stack>
      <Group>
        <Text size="sm">Current snap point:</Text>
        <Badge color={snappedPoint === null ? 'gray' : 'teal'} variant="light">
          {snappedPoint === null ? 'off' : \`\${snappedPoint}px\`}
        </Badge>
      </Group>

      {/* Percentages + onSnap callback */}
      <Split snapPoints={['25%', '50%', '75%']} snapTolerance={24}>
        <Split.Pane initialWidth={300}>Before</Split.Pane>
        <Split.Resizer onSnap={setSnappedPoint} />
        <Split.Pane grow>After</Split.Pane>
      </Split>

      {/* Snap relative to the "after" pane */}
      <Split autoResizers snapPoints={[200, 400]} snapFrom="after" snapTolerance={20}>
        <Split.Pane initialWidth={300}>Before</Split.Pane>
        <Split.Pane grow>After</Split.Pane>
      </Split>

      {/* Responsive snap sets */}
      <Split autoResizers snapPoints={{ base: [200, 400], md: [250, 500, 750] }} snapTolerance={20}>
        <Split.Pane initialWidth={300}>Before</Split.Pane>
        <Split.Pane grow>After</Split.Pane>
      </Split>
    </Stack>
  );
}
`;

export const snapAdvanced: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
