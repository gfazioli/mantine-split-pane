import { Split } from '@gfazioli/mantine-split-pane';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <Split>
      <Split.Pane initialWidth={300}>
        <h1>Pane 1</h1>
      </Split.Pane>

      <Split.Pane>
        <Split mode="horizontal">
          <Split.Pane>
            <h1>Pane 2</h1>
          </Split.Pane>

          <Split.Pane>
            <h1>Pane 3</h1>
          </Split.Pane>
        </Split>
      </Split.Pane>
    </Split>
  );
}

const code = `
import { Split } from '@gfazioli/mantine-split-pane';

function Demo() {
  return (
    <Split>
      <Split.Pane initialWidth={300}>
        <h1>Pane 1</h1>
      </Split.Pane>

      <Split.Pane>
        <Split mode="horizontal">
          <Split.Pane>
            <h1>Pane 2</h1>
          </Split.Pane>

          <Split.Pane>
            <h1>Pane 3</h1>
          </Split.Pane>
        </Split>
      </Split.Pane>
    </Split>
  );
}
`;

export const nested: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
