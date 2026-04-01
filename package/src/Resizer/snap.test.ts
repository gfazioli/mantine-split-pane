import { calculateSnappedPaneSizes, normalizeSnapPoints, snapToNearestPoint } from './snap';

describe('split resizer snap helpers', () => {
  it('normalizes snap points and tolerance', () => {
    expect(
      normalizeSnapPoints({
        snapPoints: [400, 200, Number.NaN, 200, Infinity, 600],
        snapTolerance: -5,
      })
    ).toEqual({
      snapPoints: [200, 400, 600],
      snapTolerance: 0,
    });
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
    });
  });
});
