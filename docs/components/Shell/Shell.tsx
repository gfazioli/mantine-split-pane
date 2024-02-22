import React from 'react';
import cx from 'clsx';
import { useHotkeys } from '@mantine/hooks';
import { AppShell, Container, RemoveScroll, Group, useMantineColorScheme } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { ColorSchemeControl, HeaderControls } from '@mantinex/mantine-header';
import { meta } from '@mantinex/mantine-meta';
import { PACKAGE_DATA } from '../../data';
import classes from './Shell.module.css';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const { toggleColorScheme } = useMantineColorScheme();
  useHotkeys([['mod + J', toggleColorScheme]]);

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header className={RemoveScroll.classNames.zeroRight}>
        <Container size="lg" px="md" className={classes.inner}>
          <a
            href="https://mantine.dev/"
            target="_blank"
            className={cx('mantine-focus-auto', classes.logo)}
            rel="noreferrer"
          >
            <MantineLogo size={30} />
          </a>

          <HeaderControls
            visibleFrom="sm"
            githubLink={PACKAGE_DATA.repositoryUrl}
            withDirectionToggle={false}
            withSearch={false}
            discordLink={meta.discordLink}
          />

          <Group hiddenFrom="sm">
            <ColorSchemeControl />
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <div className={classes.main}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
