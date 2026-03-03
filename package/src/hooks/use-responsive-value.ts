import { useMatches } from '@mantine/core';
import type { ResponsiveValue } from '../types';

/**
 * Resolves a `ResponsiveValue<T>` to its concrete value for the current viewport.
 * If `value` is a plain scalar, it is returned directly. If it is a Mantine
 * breakpoint map (e.g. `{ base: '100%', md: '50%' }`), the value matching the
 * current viewport width is selected via `useMatches`.
 *
 * @param value - A static value or a Mantine breakpoint map
 * @param defaultValue - Fallback returned when `value` is `undefined`
 * @returns The resolved scalar value for the current viewport
 */
export function useResponsiveValue<T>(value: ResponsiveValue<T> | undefined, defaultValue?: T): T {
  const isBreakpointMap = value !== null && value !== undefined && typeof value === 'object';
  const matched = useMatches(isBreakpointMap ? (value as Record<string, T>) : {});

  if (value === undefined || value === null) {
    return defaultValue as T;
  }

  if (isBreakpointMap) {
    return matched ?? defaultValue;
  }

  return value as T;
}
