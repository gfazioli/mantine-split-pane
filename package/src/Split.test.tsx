import React from 'react';
import { render, tests } from '@mantine-tests/core';
import { Split, SplitProps, SplitStylesNames } from './Split';

const defaultProps: SplitProps = { children: <div>Test</div> };

describe('SplitPane', () => {
  tests.itSupportsSystemProps<SplitProps, SplitStylesNames>({
    component: Split,
    props: defaultProps,
    styleProps: true,
    children: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: 'SplitPane',
    stylesApiSelectors: ['root'],
  });

  it('supports perspective prop', () => {
    const { container } = render(<Split>{<div>Test</div>}</Split>);
    expect(container.querySelector('.mantine-SplitPane-root')).toHaveStyle({
      perspective: '500px',
    });
  });
});
