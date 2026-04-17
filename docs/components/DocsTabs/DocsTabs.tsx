import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IconAdjustments, IconArrowBarUp, IconCode, IconFileText } from '@tabler/icons-react';
import { Container, Tabs } from '@mantine/core';
import { PropsTablesList } from '../PropsTable';
import { StylesApiTablesList } from '../StylesApiTable';
import { TableOfContents } from '../TableOfContents';
import classes from './DocsTabs.module.css';

interface DocsTabsProps {
  children: React.ReactNode;
  docgen: any;
  stylesApiData?: any;
  componentsProps?: string[];
  componentsStyles?: string[];
  componentPrefix?: string;
  /**
   * Optional MDX content describing breaking changes and migration steps between major versions.
   * When provided, renders a dedicated "Upgrade guide" tab next to Documentation / Props / Styles API.
   * Omit this prop (or pass `undefined`) to hide the tab entirely.
   */
  migrations?: React.ReactNode;
}

export function DocsTabs({
  children,
  docgen,
  componentsProps,
  componentsStyles,
  stylesApiData,
  componentPrefix,
  migrations,
}: DocsTabsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('docs');
  const hasProps = Array.isArray(componentsProps);
  const hasStyles = Array.isArray(componentsStyles);
  const hasMigrations = !!migrations;

  useEffect(() => {
    setActiveTab(window.location.search.replace('?t=', '') || 'docs');
  }, []);

  if (!hasProps && !hasStyles) {
    return null;
  }

  return (
    <Tabs
      variant="pills"
      value={activeTab}
      classNames={{ root: classes.root, list: classes.tabsList, tab: classes.tab }}
      keepMounted={false}
      radius="md"
      onChange={(value) => {
        router.replace(value === 'docs' ? router.pathname : `${router.pathname}?t=${value}`);
        setActiveTab(value!);
      }}
    >
      <div className={classes.tabsWrapper}>
        <Container size="lg">
          <Tabs.List>
            <Tabs.Tab value="docs">
              <div className={classes.tabInner}>
                <IconFileText size={20} stroke={1.5} className={classes.tabIcon} />
                Documentation
              </div>
            </Tabs.Tab>
            {hasProps && (
              <Tabs.Tab value="props">
                <div className={classes.tabInner}>
                  <IconCode size={20} stroke={1.5} className={classes.tabIcon} />
                  Props
                </div>
              </Tabs.Tab>
            )}
            {hasStyles && (
              <Tabs.Tab value="styles-api">
                <div className={classes.tabInner}>
                  <IconAdjustments size={20} stroke={1.5} className={classes.tabIcon} />
                  Styles API
                </div>
              </Tabs.Tab>
            )}
            {hasMigrations && (
              <Tabs.Tab value="migrations">
                <div className={classes.tabInner}>
                  <IconArrowBarUp size={20} stroke={1.5} className={classes.tabIcon} />
                  Upgrade guide
                </div>
              </Tabs.Tab>
            )}
          </Tabs.List>
        </Container>
      </div>

      <Container size="lg">
        <Tabs.Panel value="docs">
          <div className={classes.tabContent} data-main>
            <div className={classes.main} id="mdx">
              {children}
            </div>

            <div className={classes.tableOfContents}>
              <TableOfContents withTabs />
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="props">
          <div className={classes.tabContent} data-secondary>
            <PropsTablesList
              components={componentsProps!}
              componentPrefix={componentPrefix}
              data={docgen}
            />
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="styles-api">
          <div className={classes.tabContent} data-secondary>
            {stylesApiData && (
              <StylesApiTablesList
                data={stylesApiData}
                components={componentsStyles!}
                componentPrefix={componentPrefix}
              />
            )}
          </div>
        </Tabs.Panel>

        {hasMigrations && (
          <Tabs.Panel value="migrations">
            <div className={classes.tabContent} data-main data-migrations>
              <div className={classes.main} id="mdx">
                {migrations}
              </div>

              <div className={classes.tableOfContents}>
                <TableOfContents withTabs />
              </div>
            </div>
          </Tabs.Panel>
        )}
      </Container>
    </Tabs>
  );
}
