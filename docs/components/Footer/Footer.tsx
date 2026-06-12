import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconBrandGithubFilled,
  IconBrandMantine,
  IconBrandX,
  IconCoffee,
  IconHeartFilled,
  IconMailHeart,
  IconPlus,
} from '@tabler/icons-react';
import packageJson from '../../../package/package.json';
import { Logo } from '../Shell';
import { AnimateBadge } from './AnimateBadge';
import { apps, highlights, mantineComponentCategories, resources, sponsors } from './links';
import classes from './Footer.module.css';

type FooterProps = {};

type VerticalLink = {
  key: string;
  title: string;
  href: string;
  newWindow?: boolean;
  new?: boolean;
};

const VerticalLinks = ({ list, fz }: { list: VerticalLink[]; fz?: number }) => {
  return (
    <>
      {list
        .filter((item) => !packageJson.homepage.includes(item.href))
        .map((item) => (
          <Group key={item.key} gap={6} wrap="nowrap">
            <Anchor
              className={classes.columnAnchor}
              href={item.href}
              target={item.newWindow ? '_blank' : undefined}
              rel={item.newWindow ? 'noopener noreferrer' : undefined}
              fz={fz}
            >
              {item.title}
            </Anchor>
            {item.new && <AnimateBadge />}
          </Group>
        ))}
    </>
  );
};

const ColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <Title className={classes.title} order={6}>
    {children}
  </Title>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <Text className={classes.subTitle} fz={11} fw={600} c="dimmed" tt="uppercase" lts={0.5}>
    {children}
  </Text>
);

export const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={classes.contentFooter}>
      <Container className={classes.footer} size="lg">
        {/* Top tier — About + 4 link columns */}
        <Grid grow>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Stack gap="xs">
              <ThemeIcon>
                <Logo />
              </ThemeIcon>
              <Text fz={13} mr={64}>
                This Mantine UI extension component has been created to extend the capabilities of
                Mantine UI. Feel free to use it and{' '}
                <Anchor fz={13} href={(packageJson as any).repository}>
                  contribute to it
                </Anchor>
                . Don't forget to star it on{' '}
                <Anchor fz={13} href={(packageJson as any).repository}>
                  GitHub
                </Anchor>
                . And if you wish, you can also follow me on{' '}
                <Anchor fz={13} href="https://twitter.com/gfazioli">
                  Twitter
                </Anchor>
                . Obviously, you can also{' '}
                <Anchor fz={13} href="https://github.com/sponsors/gfazioli">
                  donate
                </Anchor>{' '}
                to support the development of this component.
              </Text>
              <Group>
                <ActionIcon variant="subtle" component="a" href="https://github.com/gfazioli">
                  <IconBrandGithubFilled size={24} />
                </ActionIcon>
                <ActionIcon variant="subtle" component="a" href="https://twitter.com/gfazioli">
                  <IconBrandX size={24} />
                </ActionIcon>
                <ActionIcon variant="subtle" component="a" href="https://undolog.com/">
                  <IconMailHeart size={24} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col className={classes.column} span={{ base: 6, sm: 2 }}>
            <Stack gap="xs">
              <ColumnTitle>HIGHLIGHTS</ColumnTitle>
              <VerticalLinks list={highlights} />
            </Stack>
          </Grid.Col>

          <Grid.Col className={classes.column} span={{ base: 6, sm: 2 }}>
            <Stack gap="xs">
              <ColumnTitle>MANTINE</ColumnTitle>
              <VerticalLinks list={resources} />
            </Stack>
          </Grid.Col>

          <Grid.Col className={classes.column} span={{ base: 6, sm: 2 }}>
            <Stack gap="xs">
              <ColumnTitle>APPS</ColumnTitle>
              <VerticalLinks list={apps} />
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" className={classes.lastDivider} />

        {/* Second tier — Mantine Components grouped by category */}
        <Stack gap="md">
          <ColumnTitle>OTHER MANTINE EXTENSIONS</ColumnTitle>
          <Grid grow>
            {mantineComponentCategories.map((cat) => (
              <Grid.Col key={cat.key} className={classes.column} span={{ base: 6, sm: 3 }}>
                <Stack gap="xs">
                  <SubTitle>{cat.title}</SubTitle>
                  <VerticalLinks list={[...cat.links]} />
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>

        <Divider my="xl" className={classes.lastDivider} />

        {/* Third tier — Sponsors wall */}
        <Stack gap="md" align="center" id="sponsors" className={classes.sponsorsSection}>
          <Title order={2} ta="center" tt="uppercase">
            <Text
              inherit
              component="span"
              variant="gradient"
              gradient={{ from: 'pink', to: 'grape' }}
            >
              Sponsors
            </Text>
          </Title>
          <Text fz={15} c="dimmed" ta="center" maw={560}>
            If this component saves you or your team time, consider sponsoring its development.
            Sponsors get their name or logo featured here and across all my projects' documentation
            sites.
          </Text>
          <Group justify="center" gap="xl">
            {sponsors.map((sponsor) => (
              <Anchor
                key={sponsor.key}
                href={sponsor.href ?? `https://github.com/${sponsor.github}`}
                target="_blank"
                rel="noopener noreferrer"
                underline="never"
              >
                <Stack gap={4} align="center">
                  <Avatar
                    src={`https://github.com/${sponsor.github}.png`}
                    alt={sponsor.name}
                    size="lg"
                    radius="xl"
                  />
                  <Text fz={12} c="dimmed">
                    {sponsor.name}
                  </Text>
                </Stack>
              </Anchor>
            ))}
            <Anchor
              href="https://github.com/sponsors/gfazioli"
              target="_blank"
              rel="noopener noreferrer"
              underline="never"
            >
              <Stack gap={4} align="center">
                <Avatar size="lg" radius="xl" className={classes.sponsorSlot}>
                  <IconPlus size={20} />
                </Avatar>
                <Text fz={12} c="dimmed">
                  Your logo here
                </Text>
              </Stack>
            </Anchor>
          </Group>
          <Group mb="xl" gap="sm" justify="center">
            <Button
              component="a"
              href="https://github.com/sponsors/gfazioli"
              target="_blank"
              rel="noopener noreferrer"
              variant="gradient"
              gradient={{ from: 'pink', to: 'grape' }}
              leftSection={<IconHeartFilled size={16} />}
              radius="xl"
            >
              Become a sponsor
            </Button>
            <Button
              component="a"
              href="https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00"
              target="_blank"
              rel="noopener noreferrer"
              variant="filled"
              color="yellow"
              leftSection={<IconCoffee size={16} />}
              radius="xl"
              styles={{
                label: { color: 'var(--mantine-color-white)' },
                section: { color: 'var(--mantine-color-white)' },
              }}
            >
              Buy me a coffee
            </Button>
          </Group>
        </Stack>

        <Divider my={16} className={classes.lastDivider} />

        <Group justify="center">
          <Group justify="center">
            <Text fz={12} inline>
              Made with ❤️ by{' '}
              <Anchor fz={13} href="https://gfazioli.github.io/">
                Undolog
              </Anchor>
            </Text>
            <Divider orientation="vertical" />
            <Text fz={12} inline>
              <Group gap={4} component="span">
                Hosted on{' '}
                <Anchor fz={13} href="https://github.com/">
                  <Group gap={4} component="span">
                    <IconBrandGithubFilled size={16} /> GitHub.com
                  </Group>
                </Anchor>
              </Group>
            </Text>
            <Divider orientation="vertical" />
            <Text fz={12} inline>
              <Group gap={4} component="span" justify="flex-start">
                Built with{' '}
                <Anchor fz={13} href="https://github.com/mantinedev/extension-template">
                  <Group gap={4} component="span">
                    <IconBrandMantine size={16} /> Mantine Extension Template
                  </Group>
                </Anchor>
              </Group>
            </Text>
          </Group>
        </Group>
      </Container>
    </div>
  );
};
