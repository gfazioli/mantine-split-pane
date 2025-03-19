import { Badge, MantineColor } from '@mantine/core';
import classes from './AnimateBadge.module.css';

type AnimateBadgeProps = {
  label?: string;
  color?: MantineColor;
  size?: string;
  fontSize?: number;
};

export function AnimateBadge({
  label = 'New',
  color = 'red',
  size = 'xs',
  fontSize = 10,
}: AnimateBadgeProps) {
  return (
    <Badge className={classes.badgeNew} size={size} fz={fontSize} color={color}>
      {label}
    </Badge>
  );
}
