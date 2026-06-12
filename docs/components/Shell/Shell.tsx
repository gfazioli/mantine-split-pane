import {
  ActionIcon,
  AppShell,
  Container,
  Group,
  RemoveScroll,
  Title,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { ColorSchemeControl, HeaderControls } from '@mantinex/mantine-header';
import { MantineLogo } from '@mantinex/mantine-logo';
import { meta } from '@mantinex/mantine-meta';
import { IconCoffee, IconHeartFilled } from '@tabler/icons-react';
import cx from 'clsx';
import React from 'react';
import { PACKAGE_DATA } from '../../data';
import { Logo } from './Logo';
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
            <a
              href="https://mantine.dev/"
              target="_blank"
              className={cx('mantine-focus-auto', classes.logo)}
              rel="noreferrer"
            >
              <MantineLogo size={30} type="mark" />
            </a>
            <Title order={2}>{packageName}</Title>
          </Group>
          <Group gap={10}>
            <Tooltip label="Sponsor" withArrow>
              <ActionIcon
                component="a"
                href="#sponsors"
                size="lg"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'pink', to: 'grape' }}
                aria-label="Sponsor"
                className={classes.sponsor}
              >
                <IconHeartFilled size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Buy me a coffee" withArrow>
              <ActionIcon
                component="a"
                href="https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                radius="xl"
                variant="filled"
                color="yellow"
                aria-label="Buy me a coffee"
                className={classes.sponsor}
                styles={{ root: { color: 'var(--mantine-color-white)' } }}
              >
                <IconCoffee size={16} />
              </ActionIcon>
            </Tooltip>

            <ActionIcon
              visibleFrom="sm"
              size={36}
              radius={0}
              component="a"
              href="https://gfazioli.github.io/"
              target="_blank"
              rel="noreferrer"
              aria-label="Undolog"
              title="Undolog"
              variant="transparent"
            >
              <Logo />
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
