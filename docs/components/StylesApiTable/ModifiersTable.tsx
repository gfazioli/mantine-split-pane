import React from 'react';
import { Table, TableProps, Text } from '@mantine/core';
import { TableInlineCode } from '../TableInlineCode';
import type { StylesApiData } from './StylesApiTable';

interface ModifiersTableProps extends Omit<TableProps, 'data'> {
  data: StylesApiData;
  fixedLayout?: boolean;
}

export function ModifiersTable({ data, fixedLayout = true, ...others }: ModifiersTableProps) {
  const hasConditions = data.modifiers?.some((modifier) => !!modifier.condition);
  const hasValues = data.modifiers?.some((modifier) => !!modifier.value);

  const rows =
    data.modifiers?.map((modifier, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          {Array.isArray(modifier.selector) ? modifier.selector.join(', ') : modifier.selector}
        </Table.Td>
        <Table.Td>
          <TableInlineCode>{modifier.modifier}</TableInlineCode>
        </Table.Td>
        {hasConditions && (
          <Table.Td>
            <Text fz="sm">{modifier.condition || '–'}</Text>
          </Table.Td>
        )}
        {hasValues && (
          <Table.Td>
            <Text fz="sm">{modifier.value || '–'}</Text>
          </Table.Td>
        )}
      </Table.Tr>
    )) || [];

  return (
    <Table.ScrollContainer minWidth={600}>
      <Table layout={fixedLayout ? 'fixed' : undefined} {...others}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={fixedLayout ? 210 : undefined}>Selector</Table.Th>
            <Table.Th w={fixedLayout ? 310 : undefined}>Attribute</Table.Th>
            {hasConditions && <Table.Th>Condition</Table.Th>}
            {hasValues && <Table.Th>Value</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
