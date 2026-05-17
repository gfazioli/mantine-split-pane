import { ElementProps, Text, TextProps } from '@mantine/core';
import cx from 'clsx';
import React from 'react';
import classes from './TableInlineCode.module.css';

interface TableInlineCodeProps extends TextProps, ElementProps<'span', 'color'> {}

export function TableInlineCode({ className, ...others }: TableInlineCodeProps) {
  return <Text component="span" className={cx(classes.code, className)} {...others} />;
}
