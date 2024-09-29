import {
  ActionIcon,
  AppShell,
  Container,
  Group,
  RemoveScroll,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { ColorSchemeControl, HeaderControls } from '@mantinex/mantine-header';
import { MantineLogo } from '@mantinex/mantine-logo';
import { meta } from '@mantinex/mantine-meta';
import cx from 'clsx';
import React from 'react';
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
          <Group>
          <a
            href="https://mantine.dev/"
            target="_blank"
            className={cx('mantine-focus-auto', classes.logo)}
            rel="noreferrer"
          >

            <MantineLogo size={30} type="mark" />
          </a>
            <Title order={2} c={"white"}>Mantine Split pane</Title>
            </Group>
          <Group gap={10}>
            <ActionIcon
              visibleFrom="sm"
              size={36}
              radius={8}
              component="a"
              href="https://undolog.substack.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Undolog"
              title="Undolog"
              variant='transparent'
            >
              <img
                width={36}
                src="https://substackcdn.com/image/fetch/w_96,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F188b250c-f113-4005-b757-5f21e7310424_1024x1024.png"
                alt="GitHub"
              />
            </ActionIcon>
            <HeaderControls
              visibleFrom="sm"
              githubLink={PACKAGE_DATA.repositoryUrl}
              withDirectionToggle={false}
              withSearch={false}
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
