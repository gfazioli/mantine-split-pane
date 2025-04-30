import React from 'react';
import { render } from '@mantine-tests/core';
import { Split } from './Split';

describe('Split', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Split>
        <Split.Pane>Pane 1</Split.Pane>
        <Split.Resizer />
        <Split.Pane>Pane 2</Split.Pane>
      </Split>
    );
    expect(container).toBeTruthy();
  });
});
