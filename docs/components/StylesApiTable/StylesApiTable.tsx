import React from 'react';
import { Title } from '@mantine/core';
import { TableError } from '../TableError';
import { getComponentName } from '../PropsTable';
import { SelectorsTable } from './SelectorsTable';
import { VariablesTable } from './VariablesTable';
import { ModifiersTable } from './ModifiersTable';
import classes from './StylesApiTable.module.css';

export interface StylesApiData {
  selectors: Record<string, string>;
  vars: Record<string, Record<string, string>>;
  modifiers: any[];
}

export interface StylesApiTableProps {
  component: string;
  componentPrefix: string | undefined;
  data: any;
}

export function StylesApiTable({ component, componentPrefix, data }: StylesApiTableProps) {
  if (!data) {
    return <TableError errorOf="Styles API" />;
  }

  const componentName = getComponentName({ component, componentPrefix });

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Title order={2} className={classes.title}>
          {componentName} selectors
        </Title>
        <SelectorsTable component={component} data={data} />
      </div>

      {Object.keys(data.vars).length > 0 && (
        <div className={classes.section}>
          <Title order={2} className={classes.title}>
            {componentName} CSS variables
          </Title>
          <VariablesTable data={data} />
        </div>
      )}

      {Array.isArray(data.modifiers) && data.modifiers.length > 0 && (
        <div className={classes.section}>
          <Title order={2} className={classes.title}>
            {componentName} data attributes
          </Title>
          <ModifiersTable data={data} />
        </div>
      )}
    </div>
  );
}
