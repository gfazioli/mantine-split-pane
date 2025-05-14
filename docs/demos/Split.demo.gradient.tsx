import { Split } from '@gfazioli/mantine-split-pane';
import { Paper, Title } from '@mantine/core';
import { ConfiguratorControlOptions, MantineDemo } from '@mantinex/demo';

export const gradientControls: ConfiguratorControlOptions[] = [
  { type: 'color', prop: 'gradientFrom', initialValue: 'red', libraryValue: '__none__' },
  { type: 'color', prop: 'gradientTo', initialValue: 'lime', libraryValue: '__none__' },
  {
    type: 'number',
    prop: 'gradientDegree',
    initialValue: 0,
    min: 0,
    max: 360,
    libraryValue: '__none__',
  },
  { type: 'color', prop: 'hoverGradientFrom', initialValue: 'blue', libraryValue: '__none__' },
  { type: 'color', prop: 'hoverGradientTo', initialValue: 'black', libraryValue: '__none__' },
  {
    type: 'number',
    prop: 'hoverGradientDegree',
    initialValue: 0,
    min: 0,
    max: 360,
    libraryValue: '__none__',
  },
];

function Demo(props: any) {
  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
  };

  return (
    <Split h={300}>
      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer
        variant="gradient"
        gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
        hoverGradient={{
          from: props.hoverGradientFrom,
          to: props.hoverGradientTo,
          deg: props.hoverGradientDegree,
        }}
      />

      <Split.Pane grow>
        <Paper {...paperProps}>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}

const code = (props: any) => `
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

function Demo() {
  const paperProps = {
    withBorder: true,
    w: '100%',
    h: '100%',
  };

  return (
    <Split h={300}>
      <Split.Pane>
        <Paper {...paperProps}>
          <Title>Pane 1</Title>
        </Paper>
      </Split.Pane>

      <Split.Resizer
        variant="gradient"
        gradient={{ from: '${props.gradientFrom}', to: '${props.gradientTo}', deg: '${props.gradientDegree}' }}
        hoverGradient={{
          from: '${props.hoverGradientFrom}',
          to: '${props.hoverGradientTo}',
          deg: '${props.hoverGradientDegree}',
        }}
      />

      <Split.Pane grow>
        <Paper {...paperProps}>
          <Title>Pane 2</Title>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
`;

export const gradient: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: gradientControls,
};
