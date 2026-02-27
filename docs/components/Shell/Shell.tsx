import React from 'react';
import cx from 'clsx';
import { ActionIcon, AppShell, Container, Group, RemoveScroll, Title, useMantineColorScheme } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { ColorSchemeControl, HeaderControls } from '@mantinex/mantine-header';
import { MantineLogo } from '@mantinex/mantine-logo';
import { meta } from '@mantinex/mantine-meta';
import { PACKAGE_DATA } from '../../data';
import classes from './Shell.module.css';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const { toggleColorScheme } = useMantineColorScheme();
  useHotkeys([['mod + J', toggleColorScheme]]);

  // get the package name
  const packageName = PACKAGE_DATA.packageName
    .replace('@gfazioli/', '')
    .replaceAll('-', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header className={cx(RemoveScroll.classNames.zeroRight, classes.header)}>
        <Container size="lg" px="md" className={classes.inner}>
          <Group>
            <a href="https://mantine.dev/" target="_blank" className={cx('mantine-focus-auto', classes.logo)} rel="noreferrer">
              <MantineLogo size={30} type="mark" />
            </a>
            <Title order={2}>{packageName}</Title>
          </Group>
          <Group gap={10}>
            <iframe src="https://github.com/sponsors/gfazioli/button" title="Sponsor gfazioli" height="34" width="114" className={classes.sponsor} />
            <ActionIcon
              visibleFrom="sm"
              size={36}
              radius={0}
              component="a"
              href="https://undolog.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Undolog"
              title="Undolog"
              variant="transparent"
            >
              <img height={34} src="https://github.com/gfazioli/mantine-extensions-assets/blob/main/undolog/logo-256.png?raw=true" alt="Undolog" />
            </ActionIcon>
            <HeaderControls
              visibleFrom="sm"
              githubLink={PACKAGE_DATA.repositoryUrl}
              withDirectionToggle={false}
              withSearch={false}
              withSupport={false}
              discordLink={meta.discordLink}
            />
          </Group>
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
