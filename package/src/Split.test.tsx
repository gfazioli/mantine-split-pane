import { render } from '@mantine-tests/core';
import { act, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import type { SplitPaneHandlers } from './Pane/SplitPane';
import { Split } from './Split';

type TestSplitProps = Omit<React.ComponentProps<typeof Split>, 'children'>;
type TestResizerProps = Omit<
  React.ComponentProps<typeof Split.Resizer>,
  '__beforeRef' | '__afterRef'
>;

function getNumericStyleSize(value: string, fallback: number) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function mockPaneRect(element: HTMLElement, fallbackWidth: number, fallbackHeight: number) {
  return jest.spyOn(element, 'getBoundingClientRect').mockImplementation(() => {
    const width = getNumericStyleSize(element.style.width, fallbackWidth);
    const height = getNumericStyleSize(element.style.height, fallbackHeight);

    return {
      x: 0,
      y: 0,
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      toJSON: () => ({}),
    } as DOMRect;
  });
}

function mockResizerRect(
  element: HTMLElement,
  getPosition: () => number,
  width: number,
  height: number
) {
  return jest.spyOn(element, 'getBoundingClientRect').mockImplementation(() => {
    const left = getPosition();

    return {
      x: left,
      y: left,
      width,
      height,
      top: left,
      left,
      right: left + width,
      bottom: left + height,
      toJSON: () => ({}),
    } as DOMRect;
  });
}

function setupVerticalSplit(splitProps: TestSplitProps = {}, resizerProps: TestResizerProps = {}) {
  render(
    <Split {...splitProps}>
      <Split.Pane initialWidth={300}>Pane 1</Split.Pane>
      {!splitProps.autoResizers && <Split.Resizer {...resizerProps} />}
      <Split.Pane initialWidth={700}>Pane 2</Split.Pane>
    </Split>
  );

  const resizer = screen.getByLabelText('Resize');
  const pane1 = resizer.previousElementSibling as HTMLDivElement;
  const pane2 = resizer.nextElementSibling as HTMLDivElement;

  pane1.style.width = '300px';
  pane1.style.height = '200px';
  pane2.style.width = '700px';
  pane2.style.height = '200px';
  resizer.style.width = '10px';
  resizer.style.height = '200px';

  mockPaneRect(pane1, 300, 200);
  mockPaneRect(pane2, 700, 200);
  mockResizerRect(resizer, () => getNumericStyleSize(pane1.style.width, 300), 10, 200);

  return { pane1, pane2, resizer };
}

function setupHorizontalSplit(
  splitProps: TestSplitProps = {},
  resizerProps: TestResizerProps = {}
) {
  render(
    <Split orientation="horizontal" {...splitProps}>
      <Split.Pane initialHeight={300}>Pane 1</Split.Pane>
      {!splitProps.autoResizers && <Split.Resizer {...resizerProps} />}
      <Split.Pane initialHeight={700}>Pane 2</Split.Pane>
    </Split>
  );

  const resizer = screen.getByLabelText('Resize');
  const pane1 = resizer.previousElementSibling as HTMLDivElement;
  const pane2 = resizer.nextElementSibling as HTMLDivElement;

  pane1.style.width = '200px';
  pane1.style.height = '300px';
  pane2.style.width = '200px';
  pane2.style.height = '700px';
  resizer.style.width = '200px';
  resizer.style.height = '10px';

  mockPaneRect(pane1, 200, 300);
  mockPaneRect(pane2, 200, 700);
  mockResizerRect(resizer, () => getNumericStyleSize(pane1.style.height, 300), 200, 10);

  return { pane1, pane2, resizer };
}

describe('Split', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('fires onResizing and onResizeEnd after a double-click reset with the post-reset pane sizes', () => {
    const onResizing = jest.fn();
    const onResizeEnd = jest.fn();
    const { pane1, pane2, resizer } = setupVerticalSplit({}, { onResizing, onResizeEnd });

    // Drag the resizer to move away from the initial pane widths
    fireEvent.mouseDown(resizer);
    fireEvent.mouseMove(document, { clientX: 500 });
    fireEvent.mouseUp(document);

    onResizing.mockClear();
    onResizeEnd.mockClear();

    fireEvent.doubleClick(resizer);

    expect(pane1.style.width).toBe('300px');
    expect(pane2.style.width).toBe('700px');

    expect(onResizing).toHaveBeenCalledTimes(1);
    expect(onResizing.mock.calls[0][0]).toMatchObject({
      beforePane: { width: 300 },
      afterPane: { width: 700 },
    });

    expect(onResizeEnd).toHaveBeenCalledTimes(1);
    expect(onResizeEnd.mock.calls[0][0]).toMatchObject({
      beforePane: { width: 300 },
      afterPane: { width: 700 },
    });
  });

  it('forwards onResizing and onResizeEnd to each Split.Pane after a double-click reset', () => {
    const beforeOnResizing = jest.fn();
    const beforeOnResizeEnd = jest.fn();
    const afterOnResizing = jest.fn();
    const afterOnResizeEnd = jest.fn();

    render(
      <Split>
        <Split.Pane
          initialWidth={300}
          onResizing={beforeOnResizing}
          onResizeEnd={beforeOnResizeEnd}
        >
          Pane 1
        </Split.Pane>
        <Split.Resizer />
        <Split.Pane initialWidth={700} onResizing={afterOnResizing} onResizeEnd={afterOnResizeEnd}>
          Pane 2
        </Split.Pane>
      </Split>
    );

    const resizer = screen.getByLabelText('Resize');
    const pane1 = resizer.previousElementSibling as HTMLDivElement;
    const pane2 = resizer.nextElementSibling as HTMLDivElement;

    pane1.style.width = '300px';
    pane1.style.height = '200px';
    pane2.style.width = '700px';
    pane2.style.height = '200px';
    resizer.style.width = '10px';
    resizer.style.height = '200px';

    mockPaneRect(pane1, 300, 200);
    mockPaneRect(pane2, 700, 200);
    mockResizerRect(resizer, () => getNumericStyleSize(pane1.style.width, 300), 10, 200);

    fireEvent.doubleClick(resizer);

    expect(beforeOnResizing).toHaveBeenCalledTimes(1);
    expect(beforeOnResizing.mock.calls[0][0]).toMatchObject({ width: 300 });

    expect(afterOnResizing).toHaveBeenCalledTimes(1);
    expect(afterOnResizing.mock.calls[0][0]).toMatchObject({ width: 700 });

    expect(beforeOnResizeEnd).toHaveBeenCalledTimes(1);
    expect(beforeOnResizeEnd.mock.calls[0][0]).toMatchObject({ width: 300 });

    expect(afterOnResizeEnd).toHaveBeenCalledTimes(1);
    expect(afterOnResizeEnd.mock.calls[0][0]).toMatchObject({ width: 700 });
  });

  it('renders custom children passed to Split.Resizer', () => {
    render(
      <Split>
        <Split.Pane>Pane 1</Split.Pane>
        <Split.Resizer>
          <span data-testid="resizer-child">grip</span>
        </Split.Resizer>
        <Split.Pane>Pane 2</Split.Pane>
      </Split>
    );

    expect(screen.getByTestId('resizer-child')).toBeInTheDocument();
  });

  it('snaps vertical drag movements to configured points', () => {
    const { pane1, pane2, resizer } = setupVerticalSplit(
      { snapPoints: [200, 400, 600], snapTolerance: 10 },
      {}
    );

    fireEvent.mouseDown(resizer);
    fireEvent.mouseMove(document, { clientX: 405 });
    fireEvent.mouseUp(document);

    expect(pane1.style.width).toBe('400px');
    expect(pane2.style.width).toBe('600px');
  });

  it('snaps horizontal drag movements to configured points', () => {
    const { pane1, pane2, resizer } = setupHorizontalSplit(
      { snapPoints: [200, 400, 600], snapTolerance: 10 },
      {}
    );

    fireEvent.mouseDown(resizer);
    fireEvent.mouseMove(document, { clientY: 405 });
    fireEvent.mouseUp(document);

    expect(pane1.style.height).toBe('400px');
    expect(pane2.style.height).toBe('600px');
  });

  it('applies snap points during keyboard resizing', () => {
    const { pane1, pane2, resizer } = setupVerticalSplit({
      snapPoints: [200, 400, 600],
      snapTolerance: 10,
      step: 95,
    });

    resizer.focus();
    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });

    expect(pane1.style.width).toBe('400px');
    expect(pane2.style.width).toBe('600px');
  });

  it('passes split-level snap props to auto-generated resizers', () => {
    const { pane1, pane2, resizer } = setupVerticalSplit({
      autoResizers: true,
      snapPoints: [200, 400, 600],
      snapTolerance: 10,
      step: 95,
    });

    resizer.focus();
    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });

    expect(pane1.style.width).toBe('400px');
    expect(pane2.style.width).toBe('600px');
  });

  it('allows a resizer to override split-level snap points', () => {
    const { pane1, pane2, resizer } = setupVerticalSplit(
      {
        snapPoints: [200, 400, 600],
        snapTolerance: 10,
        step: 195,
      },
      {
        snapPoints: [500],
      }
    );

    resizer.focus();
    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });

    expect(pane1.style.width).toBe('500px');
    expect(pane2.style.width).toBe('500px');
  });

  it('resolves percentage snap points against the combined pane size', () => {
    const { pane1, pane2, resizer } = setupVerticalSplit({
      snapPoints: ['50%'],
      snapTolerance: 10,
      step: 95,
    });

    resizer.focus();
    // total = 1000, 50% = 500. Starting at 300, step 95 brings us to 395; next press to 490 -> snap to 500.
    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });
    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });

    expect(pane1.style.width).toBe('500px');
    expect(pane2.style.width).toBe('500px');
  });

  it('snaps relative to the after pane when snapFrom="after"', () => {
    const { pane1, pane2, resizer } = setupVerticalSplit({
      // pane2 target size 400 -> pane1 must become 600
      snapPoints: [400],
      snapFrom: 'after',
      snapTolerance: 15,
      step: 295,
    });

    resizer.focus();
    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });

    expect(pane1.style.width).toBe('600px');
    expect(pane2.style.width).toBe('400px');
  });

  it('fires onSnap when entering and leaving a snap zone', () => {
    const onSnap = jest.fn();
    const { resizer } = setupVerticalSplit(
      { snapPoints: [400], snapTolerance: 10, step: 95 },
      { onSnap }
    );

    resizer.focus();
    // 300 -> 395 (snap to 400)
    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });
    // 400 -> 495 (out of snap)
    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });

    expect(onSnap).toHaveBeenNthCalledWith(1, 400);
    expect(onSnap).toHaveBeenNthCalledWith(2, null);
  });

  it('exposes data-snapping on the resizer while in a snap zone', () => {
    const { resizer } = setupVerticalSplit({
      snapPoints: [400],
      snapTolerance: 10,
      step: 95,
    });

    expect(resizer).not.toHaveAttribute('data-snapping');

    resizer.focus();
    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(resizer).toHaveAttribute('data-snapping');

    fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(resizer).not.toHaveAttribute('data-snapping');
  });

  describe('a ref on Split.Pane (#95)', () => {
    it('receives the pane handlers with manual resizers, as an object ref and as a callback ref', () => {
      const objectRef = React.createRef<SplitPaneHandlers>();
      const callbackRef = jest.fn();

      render(
        <Split>
          <Split.Pane ref={objectRef}>Pane 1</Split.Pane>
          <Split.Resizer />
          <Split.Pane ref={callbackRef}>Pane 2</Split.Pane>
        </Split>
      );

      const resizer = screen.getByLabelText('Resize');
      expect(objectRef.current?.splitPane).toBe(resizer.previousElementSibling);
      expect(typeof objectRef.current?.resetInitialSize).toBe('function');

      const handles = callbackRef.mock.calls.map(([handle]) => handle).filter(Boolean);
      expect(handles.length).toBeGreaterThan(0);
      expect(handles[handles.length - 1].splitPane).toBe(resizer.nextElementSibling);
    });

    it('receives the pane handlers with autoResizers', () => {
      const objectRef = React.createRef<SplitPaneHandlers>();

      render(
        <Split autoResizers>
          <Split.Pane>Pane 1</Split.Pane>
          <Split.Pane ref={objectRef}>Pane 2</Split.Pane>
        </Split>
      );

      const resizer = screen.getByLabelText('Resize');
      expect(objectRef.current?.splitPane).toBe(resizer.nextElementSibling);
      expect(typeof objectRef.current?.getMinWidth).toBe('function');
    });

    it('releases a callback ref on unmount', () => {
      const callbackRef = jest.fn();

      const { unmount } = render(
        <Split>
          {/* inline, so the handle's type comes from the pane's ref prop */}
          <Split.Pane ref={(handle) => callbackRef(handle?.splitPane ?? null)}>Pane 1</Split.Pane>
          <Split.Resizer />
          <Split.Pane>Pane 2</Split.Pane>
        </Split>
      );

      unmount();
      expect(callbackRef).toHaveBeenLastCalledWith(null);
    });

    it('keeps one handle across renders, so a state setter can be the ref', () => {
      let latest: SplitPaneHandlers | null = null;
      let setMin: (value: number) => void = () => {};
      const seen = new Set<SplitPaneHandlers>();

      // Re-renders from its own state: the rerender of the test helper remounts the tree
      function Harness() {
        const [pane, setPane] = React.useState<SplitPaneHandlers | null>(null);
        const [minWidth, setMinWidth] = React.useState(100);
        setMin = setMinWidth;
        latest = pane;
        if (pane) {
          seen.add(pane);
        }
        return (
          <Split>
            <Split.Pane ref={setPane} minWidth={minWidth}>
              Pane 1
            </Split.Pane>
            <Split.Resizer />
            <Split.Pane>Pane 2</Split.Pane>
          </Split>
        );
      }

      render(<Harness />);
      expect(latest).not.toBeNull();
      expect(latest!.getMinWidth?.()).toBe(100);

      act(() => setMin(150));
      expect(seen.size).toBe(1);
      expect(latest!.getMinWidth?.()).toBe(150);
    });

    it('settles an inline callback ref that stores the handle, and keeps it when a pane is added', () => {
      let latest: SplitPaneHandlers | null = null;
      let addPane: () => void = () => {};
      const seen = new Set<SplitPaneHandlers>();

      function Harness() {
        const [pane, setPane] = React.useState<SplitPaneHandlers | null>(null);
        const [extra, setExtra] = React.useState(false);
        addPane = () => setExtra(true);
        latest = pane;
        if (pane) {
          seen.add(pane);
        }
        return (
          <Split>
            <Split.Pane ref={(handle) => setPane(handle)}>Pane 1</Split.Pane>
            <Split.Resizer />
            <Split.Pane>Pane 2</Split.Pane>
            {extra && <Split.Resizer key="extra-resizer" />}
            {extra && <Split.Pane key="extra-pane">Pane 3</Split.Pane>}
          </Split>
        );
      }

      render(<Harness />);
      expect(latest).not.toBeNull();

      act(() => addPane());
      expect(screen.getAllByLabelText('Resize')).toHaveLength(2);
      expect(seen.size).toBe(1);
      expect(latest!.splitPane).toBe(screen.getAllByLabelText('Resize')[0].previousElementSibling);
    });

    it('keeps the resizer working when the panes carry refs of their own', () => {
      const firstRef = React.createRef<SplitPaneHandlers>();
      const secondRef = React.createRef<SplitPaneHandlers>();

      render(
        <Split step={10}>
          <Split.Pane ref={firstRef} initialWidth={300}>
            Pane 1
          </Split.Pane>
          <Split.Resizer />
          <Split.Pane ref={secondRef} initialWidth={700}>
            Pane 2
          </Split.Pane>
        </Split>
      );

      const resizer = screen.getByLabelText('Resize');
      const pane1 = resizer.previousElementSibling as HTMLDivElement;
      const pane2 = resizer.nextElementSibling as HTMLDivElement;
      pane1.style.width = '300px';
      pane2.style.width = '700px';
      mockPaneRect(pane1, 300, 200);
      mockPaneRect(pane2, 700, 200);

      resizer.focus();
      fireEvent.keyDown(resizer, { key: 'ArrowRight', code: 'ArrowRight' });

      expect(pane1.style.width).toBe('310px');
      expect(pane2.style.width).toBe('690px');
      expect(firstRef.current?.splitPane).toBe(pane1);
      expect(secondRef.current?.splitPane).toBe(pane2);
    });
  });
});
