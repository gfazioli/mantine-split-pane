import React from 'react';
import { Code } from '@mantine/core';
import { MdxLink, MdxParagraph, MdxTitle } from '../MdxElements/MdxElements';
import { StylesApiTable } from './StylesApiTable';
import classes from './StylesApiTable.module.css';

interface StylesApiTablesListProps {
  components: string[];
  data: any;
  componentPrefix?: string;
}

export function StylesApiTablesList({
  components,
  data,
  componentPrefix,
}: StylesApiTablesListProps) {
  const tables = components.map((component) => (
    <div className={classes.group} key={component}>
      <StylesApiTable
        component={component}
        componentPrefix={componentPrefix}
        data={data[component]}
      />
    </div>
  ));

  return (
    <>
      <div className={classes.groupsHeader}>
        <MdxTitle style={{ marginTop: 0 }}>Styles API</MdxTitle>
        <MdxParagraph style={{ marginTop: 0 }}>
          <Code>{components[0]}</Code> component supports{' '}
          <MdxLink href="https://mantine.dev/styles/styles-api" target="_blank">
            Styles API
          </MdxLink>
          . With Styles API, you can customize styles of any inner element. Follow{' '}
          <MdxLink href="https://mantine.dev/styles/styles-api" target="_blank">
            the documentation
          </MdxLink>{' '}
          to learn how to use CSS modules, CSS variables and inline styles to get full control over
          component styles.
        </MdxParagraph>
      </div>
      {tables}
    </>
  );
}
