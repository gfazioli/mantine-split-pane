import {
  calculateSnappedPaneSizes,
  DEFAULT_SNAP_TOLERANCE,
  isValidSnapPoint,
  normalizeSnapPoints,
  resolveSnapPoint,
  snapToNearestPoint,
} from './snap';

describe('split resizer snap helpers', () => {
  it('normalizes snap points and tolerance', () => {
    expect(
      normalizeSnapPoints({
        snapPoints: [400, 200, Number.NaN, 200, Infinity, 600],
        snapTolerance: -5,
      })
    ).toEqual({
      snapPoints: [400, 200, 600],
      snapTolerance: 0,
    });
  });

  it('handles non-array snapPoints gracefully', () => {
    expect(
      normalizeSnapPoints({
        snapPoints: 0 as unknown as number[],
        snapTolerance: 10,
      })
    ).toEqual({
      snapPoints: [],
      snapTolerance: 10,
    });
  });

  it('defaults snap tolerance when it is undefined', () => {
    expect(
      normalizeSnapPoints({
        snapPoints: [400, 200, 600],
      })
    ).toEqual({
      snapPoints: [400, 200, 600],
      snapTolerance: DEFAULT_SNAP_TOLERANCE,
    });
  });

  it('filters out negative pixel values', () => {
    expect(normalizeSnapPoints({ snapPoints: [-100, 0, 200, -50] }).snapPoints).toEqual([0, 200]);
  });

  it('accepts percentage strings and trims whitespace', () => {
    expect(normalizeSnapPoints({ snapPoints: ['25%', ' 50% ', '75%', '50%'] }).snapPoints).toEqual([
      '25%',
      '50%',
      '75%',
    ]);
  });

  it('rejects malformed percentage strings', () => {
    expect(
      normalizeSnapPoints({
        snapPoints: ['50', 'abc', '', '100%%', '10.5%', '-20%'] as unknown as number[],
      }).snapPoints
    ).toEqual(['10.5%']);
  });

  it('mixes numbers and percentages', () => {
    expect(normalizeSnapPoints({ snapPoints: [200, '50%', 400, '50%'] }).snapPoints).toEqual([
      200,
      '50%',
      400,
    ]);
  });

  it('resolves percentage snap points against a total size', () => {
    expect(resolveSnapPoint('50%', 800)).toBe(400);
    expect(resolveSnapPoint('25%', 1000)).toBe(250);
    expect(resolveSnapPoint(300, 1000)).toBe(300);
  });

  it('validates snap points', () => {
    expect(isValidSnapPoint(100)).toBe(true);
    expect(isValidSnapPoint('50%')).toBe(true);
    expect(isValidSnapPoint(-1)).toBe(false);
    expect(isValidSnapPoint(Number.NaN)).toBe(false);
    expect(isValidSnapPoint('abc')).toBe(false);
    expect(isValidSnapPoint(null)).toBe(false);
  });

  it('snaps to the nearest point within tolerance', () => {
    expect(snapToNearestPoint(391, [200, 400, 600], 10)).toBe(400);
    expect(snapToNearestPoint(205, [200, 210], 5)).toBe(200);
  });

  it('does not snap outside tolerance', () => {
    expect(snapToNearestPoint(350, [200, 400, 600], 10)).toBe(350);
  });

  it('keeps snapped sizes within adjacent pane constraints', () => {
    const normalizedSnap = normalizeSnapPoints({
      snapPoints: [200, 450, 500],
      snapTolerance: 20,
    });

    expect(
      calculateSnappedPaneSizes({
        beforeSize: 300,
        afterSize: 700,
        delta: 110,
        minBeforeSize: 100,
        maxBeforeSize: 450,
        minAfterSize: 600,
        maxAfterSize: 900,
        snapPoints: normalizedSnap.snapPoints,
        snapTolerance: normalizedSnap.snapTolerance,
      })
    ).toEqual({
      beforeSize: 400,
      afterSize: 600,
      snappedPoint: null,
    });
  });

  it('ignores snap points that would violate adjacent pane constraints', () => {
    const normalizedSnap = normalizeSnapPoints({
      snapPoints: [200, 450, 500],
      snapTolerance: 10,
    });

    expect(
      calculateSnappedPaneSizes({
        beforeSize: 300,
        afterSize: 700,
        delta: 145,
        minBeforeSize: 100,
        maxBeforeSize: 450,
        minAfterSize: 600,
        maxAfterSize: 900,
        snapPoints: normalizedSnap.snapPoints,
        snapTolerance: normalizedSnap.snapTolerance,
      })
    ).toEqual({
      beforeSize: 400,
      afterSize: 600,
      snappedPoint: null,
    });
  });

  it('reports the snapped point value when a snap applies', () => {
    expect(
      calculateSnappedPaneSizes({
        beforeSize: 190,
        afterSize: 810,
        delta: 5,
        snapPoints: [200, 400],
        snapTolerance: 20,
      })
    ).toEqual({
      beforeSize: 200,
      afterSize: 800,
      snappedPoint: 200,
    });
  });

  it('resolves percentage snap points against the current total size', () => {
    expect(
      calculateSnappedPaneSizes({
        beforeSize: 390,
        afterSize: 610,
        delta: 120,
        snapPoints: ['50%'],
        snapTolerance: 15,
      })
    ).toEqual({
      beforeSize: 500,
      afterSize: 500,
      snappedPoint: 500,
    });
  });

  it('snaps relative to the after pane when snapFrom is "after"', () => {
    expect(
      calculateSnappedPaneSizes({
        beforeSize: 600,
        afterSize: 400,
        delta: 15,
        snapPoints: [380],
        snapTolerance: 20,
        snapFrom: 'after',
      })
    ).toEqual({
      beforeSize: 620,
      afterSize: 380,
      snappedPoint: 380,
    });
  });

  it('returns snappedPoint=null when no snap applies', () => {
    const result = calculateSnappedPaneSizes({
      beforeSize: 350,
      afterSize: 650,
      delta: 0,
      snapPoints: [100, 500],
      snapTolerance: 10,
    });

    expect(result.snappedPoint).toBeNull();
    expect(result.beforeSize).toBe(350);
  });
});
