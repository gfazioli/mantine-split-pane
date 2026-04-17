import React from 'react';
import { render } from '@mantine-tests/core';
import { fireEvent, screen } from '@testing-library/react';
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
});
