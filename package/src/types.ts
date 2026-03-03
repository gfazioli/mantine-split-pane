import type { MantineBreakpoint } from '@mantine/core';

/** A value that can be static or vary by Mantine breakpoint */
export type ResponsiveValue<T> = T | Partial<Record<MantineBreakpoint | (string & {}), T>>;
