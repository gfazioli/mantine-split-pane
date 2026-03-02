import React from 'react';
import { SplitPane, type SplitPaneBaseProps } from '../Pane/SplitPane';
import { SplitResizer, type SplitResizerProps } from '../Resizer/SplitResizer';

/**
 * Declarative configuration for a single pane inside `Split.Dynamic`.
 * Extends all `Split.Pane` props (`initialWidth`, `grow`, `minWidth`, etc.)
 * and adds an `id`, the pane `content`, and optional per-pane `resizerProps`.
 */
export interface PaneConfig extends SplitPaneBaseProps {
  /** Unique identifier used as the React key for the pane and its resizer */
  id: string;

  /** Content to render inside the pane */
  content: React.ReactNode;

  /** Props forwarded to the resizer inserted after this pane (ignored on the last visible pane) */
  resizerProps?: Omit<SplitResizerProps, 'beforeRef' | 'afterRef'>;
}

/** Props accepted by the `Split.Dynamic` helper function */
export interface SplitDynamicProps {
  /** Array of pane configurations defining the layout */
  panes: PaneConfig[];

  /** Optional predicate to conditionally include/exclude panes from the layout */
  filter?: (pane: PaneConfig) => boolean;
}

/**
 * Generates an array of `Split.Pane` and `Split.Resizer` elements from a
 * `PaneConfig[]` array. This is a helper function (not a component) — call it
 * inside `<Split>` children:
 *
 * @example
 * <Split>
 *   {Split.Dynamic({ panes })}
 * </Split>
 *
 * @param props - The pane configurations and optional filter
 * @returns An array of React elements ready to be rendered inside `<Split>`
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
