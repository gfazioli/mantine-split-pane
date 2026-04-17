function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export const DEFAULT_SNAP_TOLERANCE = 10;

export type SnapPointValue = number | string;

export type SnapReference = 'before' | 'after';

export interface NormalizeSnapPointsInput {
  snapPoints?: SnapPointValue[];
  snapTolerance?: number;
}

export interface NormalizeSnapPointsResult {
  snapPoints: SnapPointValue[];
  snapTolerance: number;
}

export interface CalculateSnappedPaneSizesInput {
  beforeSize: number;
  afterSize: number;
  delta: number;
  minBeforeSize?: number;
  maxBeforeSize?: number;
  minAfterSize?: number;
  maxAfterSize?: number;
  snapPoints: SnapPointValue[];
  snapTolerance: number;
  snapFrom?: SnapReference;
}

export interface CalculateSnappedPaneSizesResult {
  beforeSize: number;
  afterSize: number;
  /** Pixel value of the point that just snapped, expressed in the reference chosen via `snapFrom`. `null` when no snap applied. */
  snappedPoint: number | null;
}

const PERCENTAGE_PATTERN = /^(\d+(?:\.\d+)?)%$/;

export function isValidSnapPoint(value: unknown): value is SnapPointValue {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value >= 0;
  }
  if (typeof value === 'string') {
    const match = value.trim().match(PERCENTAGE_PATTERN);
    return match !== null && Number.isFinite(parseFloat(match[1]));
  }
  return false;
}

export function resolveSnapPoint(point: SnapPointValue, totalSize: number): number {
  if (typeof point === 'number') {
    return point;
  }
  const match = point.trim().match(PERCENTAGE_PATTERN);
  if (!match) {
    return Number.NaN;
  }
  return (parseFloat(match[1]) / 100) * totalSize;
}

export function normalizeSnapPoints({
  snapPoints,
  snapTolerance,
}: NormalizeSnapPointsInput): NormalizeSnapPointsResult {
  const normalizedTolerance = Math.max(0, snapTolerance ?? DEFAULT_SNAP_TOLERANCE);
  const raw = Array.isArray(snapPoints) ? snapPoints : [];
  const valid = raw.filter(isValidSnapPoint);

  const seen = new Set<string>();
  const dedup: SnapPointValue[] = [];
  for (const point of valid) {
    const key = typeof point === 'string' ? point.trim() : String(point);
    if (!seen.has(key)) {
      seen.add(key);
      dedup.push(typeof point === 'string' ? point.trim() : point);
    }
  }

  return {
    snapPoints: dedup,
    snapTolerance: normalizedTolerance,
  };
}

interface SnapMatch {
  value: number;
  point: number | null;
}

function findNearestSnap(value: number, points: number[], tolerance: number): SnapMatch {
  let snappedValue = value;
  let snappedPoint: number | null = null;
  let shortestDistance = Infinity;

  for (const point of points) {
    const distance = Math.abs(value - point);

    if (
      distance <= tolerance &&
      (distance < shortestDistance || (distance === shortestDistance && point < snappedValue))
    ) {
      snappedValue = point;
      snappedPoint = point;
      shortestDistance = distance;
    }
  }

  return { value: snappedValue, point: snappedPoint };
}

export function snapToNearestPoint(value: number, snapPoints: number[], tolerance: number): number {
  return findNearestSnap(value, snapPoints, tolerance).value;
}

export function calculateSnappedPaneSizes({
  beforeSize,
  afterSize,
  delta,
  minBeforeSize,
  maxBeforeSize,
  minAfterSize,
  maxAfterSize,
  snapPoints,
  snapTolerance,
  snapFrom = 'before',
}: CalculateSnappedPaneSizesInput): CalculateSnappedPaneSizesResult {
  const totalSize = beforeSize + afterSize;
  const safeMinBeforeSize = Math.max(0, minBeforeSize ?? 0);
  const safeMaxBeforeSize = maxBeforeSize ?? totalSize;
  const safeMinAfterSize = Math.max(0, minAfterSize ?? 0);
  const safeMaxAfterSize = maxAfterSize ?? totalSize;

  const minAllowedBeforeSize = Math.max(safeMinBeforeSize, totalSize - safeMaxAfterSize, 0);
  const maxAllowedBeforeSize = Math.min(safeMaxBeforeSize, totalSize - safeMinAfterSize, totalSize);

  if (minAllowedBeforeSize > maxAllowedBeforeSize) {
    return { beforeSize, afterSize, snappedPoint: null };
  }

  let nextBeforeSize = clamp(beforeSize + delta, minAllowedBeforeSize, maxAllowedBeforeSize);
  let snappedPoint: number | null = null;

  if (snapPoints.length > 0) {
    const resolved = snapPoints
      .map((point) => {
        const asBefore = resolveSnapPoint(point, totalSize);
        return snapFrom === 'after' ? totalSize - asBefore : asBefore;
      })
      .filter(
        (point) =>
          Number.isFinite(point) && point >= minAllowedBeforeSize && point <= maxAllowedBeforeSize
      );

    const match = findNearestSnap(nextBeforeSize, resolved, snapTolerance);
    nextBeforeSize = match.value;
    if (match.point !== null) {
      snappedPoint = snapFrom === 'after' ? totalSize - match.point : match.point;
    }
  }

  return {
    beforeSize: nextBeforeSize,
    afterSize: totalSize - nextBeforeSize,
    snappedPoint,
  };
}
