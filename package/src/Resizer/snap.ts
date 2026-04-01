function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export interface NormalizeSnapPointsInput {
  snapPoints?: number[];
  snapTolerance?: number;
}

export interface NormalizeSnapPointsResult {
  snapPoints: number[];
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
  snapPoints: number[];
  snapTolerance: number;
}

export interface CalculateSnappedPaneSizesResult {
  beforeSize: number;
  afterSize: number;
}

export function normalizeSnapPoints({
  snapPoints,
  snapTolerance,
}: NormalizeSnapPointsInput): NormalizeSnapPointsResult {
  const normalizedTolerance = Math.max(0, snapTolerance ?? 0);
  const normalizedPoints = Array.from(
    new Set((snapPoints ?? []).filter((point) => Number.isFinite(point)))
  ).sort((a, b) => a - b);

  return {
    snapPoints: normalizedPoints,
    snapTolerance: normalizedTolerance,
  };
}

export function snapToNearestPoint(value: number, snapPoints: number[], tolerance: number): number {
  let snappedValue = value;
  let shortestDistance = Infinity;

  for (const point of snapPoints) {
    const distance = Math.abs(value - point);

    if (
      distance <= tolerance &&
      (distance < shortestDistance || (distance === shortestDistance && point < snappedValue))
    ) {
      snappedValue = point;
      shortestDistance = distance;
    }
  }

  return snappedValue;
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
}: CalculateSnappedPaneSizesInput): CalculateSnappedPaneSizesResult {
  const totalSize = beforeSize + afterSize;
  const safeMinBeforeSize = Math.max(0, minBeforeSize ?? 0);
  const safeMaxBeforeSize = maxBeforeSize ?? totalSize;
  const safeMinAfterSize = Math.max(0, minAfterSize ?? 0);
  const safeMaxAfterSize = maxAfterSize ?? totalSize;

  const minAllowedBeforeSize = Math.max(safeMinBeforeSize, totalSize - safeMaxAfterSize, 0);
  const maxAllowedBeforeSize = Math.min(safeMaxBeforeSize, totalSize - safeMinAfterSize, totalSize);

  if (minAllowedBeforeSize > maxAllowedBeforeSize) {
    return { beforeSize, afterSize };
  }

  let nextBeforeSize = clamp(beforeSize + delta, minAllowedBeforeSize, maxAllowedBeforeSize);

  if (snapPoints.length > 0) {
    const availableSnapPoints = snapPoints.filter(
      (point) => point >= minAllowedBeforeSize && point <= maxAllowedBeforeSize
    );

    nextBeforeSize = snapToNearestPoint(nextBeforeSize, availableSnapPoints, snapTolerance);
  }

  return {
    beforeSize: nextBeforeSize,
    afterSize: totalSize - nextBeforeSize,
  };
}
