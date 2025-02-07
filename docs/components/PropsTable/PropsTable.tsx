import React from 'react';
import { Highlight, Table, Text } from '@mantine/core';
import { TableError } from '../TableError';
import { TableInlineCode } from '../TableInlineCode';

export interface DocgenProp {
  defaultValue: {
    value: string;
  };
  description: string;
  name: string;
  required: boolean;
  type: {
    name: string;
  };
}

export interface Docgen {
  description: string;
  displayName: string;
  props: Record<string, DocgenProp>;
}

interface PropsTableProps {
  component: string;
  query: string;
  data: any;
}

export function PropsTable({ component, query, data }: PropsTableProps) {
  if (!data[component]) {
    return <TableError errorOf="props" />;
  }

  const rows = Object.keys(data[component].props)
    .filter((propKey) =>
      data[component].props[propKey].name.toLowerCase().includes(query.toLowerCase().trim())
    )
    .map((propKey) => {
      const prop = data[component].props[propKey];

      return (
        <Table.Tr key={propKey}>
          <Table.Td style={{ whiteSpace: 'nowrap' }}>
            <Highlight highlight={query} component="span" fz="sm">
              {prop.name}
            </Highlight>

            {prop.required && (
              <Text component="sup" c="red" fz="xs">
                {' '}
                *
              </Text>
            )}
          </Table.Td>

          <Table.Td>
            <TableInlineCode>{prop.type.name}</TableInlineCode>
          </Table.Td>
          <Table.Td>
            <Text fz="sm" dangerouslySetInnerHTML={{ __html: prop.description }} />
          </Table.Td>
        </Table.Tr>
      );
    });

  if (rows.length === 0) {
    return (
      <Text c="dimmed" mb="xl" fz="sm">
        Nothing found
      </Text>
    );
  }

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table layout="fixed">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={210}>Name</Table.Th>
            <Table.Th w={310}>Type</Table.Th>
            <Table.Th>Description</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
