import { Split } from '@gfazioli/mantine-split-pane';
import { Code } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <Split>
      <Split.Pane>
        <h1>Pane 1</h1>
      </Split.Pane>

      <Split.Pane>
        <h1>Pane 2</h1>
      </Split.Pane>

      <Split.Pane initialWidth={280} maxWidth={300}>
        <div>
          <h1>Pane 3</h1>

          <Code>{`initialWidth={280} maxWidth={300}`}</Code>
        </div>
      </Split.Pane>

      <Split.Pane>
        <h1>Pane 4</h1>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';

function Demo() {
  return (
    <Split>
      <Split.Pane>
        <h1>Pane 1</h1>
      </Split.Pane>

      <Split.Pane>
        <h1>Pane 2</h1>
      </Split.Pane>

      <Split.Pane initialWidth={280} maxWidth={300}>
        <h1>Pane 3</h1>
      </Split.Pane>

      <Split.Pane>
        <h1>Pane 4</h1>
      </Split.Pane>
    </Split>
  );
}
`;

export const multiple: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
