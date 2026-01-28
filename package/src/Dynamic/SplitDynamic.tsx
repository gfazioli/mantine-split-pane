import React from 'react';
import { SplitPane, type SplitPaneBaseProps } from '../Pane/SplitPane';
import { SplitResizer, type SplitResizerProps } from '../Resizer/SplitResizer';

export interface PaneConfig extends SplitPaneBaseProps {
  /** Unique identifier for the pane */
  id: string;

  /** Content to render inside the pane */
  content: React.ReactNode;

  /** Custom resizer props for the resizer after this pane (optional) */
  resizerProps?: Omit<SplitResizerProps, 'beforeRef' | 'afterRef'>;
}

export interface SplitDynamicProps {
  /** Array of pane configurations */
  panes: PaneConfig[];

  /** Filter function to conditionally render panes */
  filter?: (pane: PaneConfig) => boolean;
}

/**
 * Helper function to generate Split.Pane and Split.Resizer elements from a PaneConfig array.
 * Use this inside Split children as a function call, not as a component:
 *
 * @example
 * <Split>
 *   {Split.Dynamic({ panes })}
 * </Split>
 */
export function SplitDynamic({ panes, filter }: SplitDynamicProps): React.ReactNode[] {
  const visiblePanes = filter ? panes.filter(filter) : panes;

  const elements: React.ReactNode[] = [];

  visiblePanes.forEach((pane, index) => {
    const { id, content, resizerProps, ...paneProps } = pane;

    // Add the pane
    elements.push(
      <SplitPane key={id} {...paneProps}>
        {content}
      </SplitPane>
    );

    // Add resizer after the pane (except for the last pane)
    if (index < visiblePanes.length - 1) {
      elements.push(<SplitResizer key={`resizer-after-${id}`} {...resizerProps} />);
    }
  });

  return elements;
}

SplitDynamic.displayName = 'Split.Dynamic';
