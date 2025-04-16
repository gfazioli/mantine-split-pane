import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function GrowFirst() {
  return (
    <Split>
      <Split.Pane grow>
        <Paper withBorder>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';

function Demo() {
  return (
    <Split>
      <Split.Pane grow>
        <Paper withBorder>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const growFirst: MantineDemo = {
  type: 'code',
  component: GrowFirst,
  code,
  defaultExpanded: false,
};

// ---------------------------------------------------------------------------

function GrowSecond() {
  return (
    <Split>
      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const codeSecond = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';

function Demo() {
  return (
    <Split>
      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const growSecond: MantineDemo = {
  type: 'code',
  component: GrowSecond,
  code: codeSecond,
  defaultExpanded: false,
};

// ---------------------------------------------------------------------------

function GrowThreePanes() {
  return (
    <Split>
      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const codeThreePanes = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';

function Demo() {
  return (
    <Split>
      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane>
        <Paper withBorder>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const growThreePanes: MantineDemo = {
  type: 'code',
  component: GrowThreePanes,
  code: codeThreePanes,
  defaultExpanded: false,
};

// ---------------------------------------------------------------------------

function GrowHorizontal() {
  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
  };

  return (
    <Split orientation="horizontal" h={500}>
      <Split.Pane minHeight="10%">
        <Paper {...paperProps}>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow minHeight="10%">
        <Paper {...paperProps}>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const codeHorizontal = `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';

function Demo() {
  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
  };

  return (
    <Split orientation="horizontal" h={500}>
      <Split.Pane minHeight="10%">
        <Paper {...paperProps}>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane grow minHeight="10%">
        <Paper {...paperProps}>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const growHorizontal: MantineDemo = {
  type: 'code',
  component: GrowHorizontal,
  code: codeHorizontal,
  defaultExpanded: false,
};
