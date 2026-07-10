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

// Social share — "spread the word" buttons rendered below the sponsor CTAs.
// Share-intent links (no SDK); brand marks are inline SVGs (fill=currentColor).
const shareUrl = packageJson.homepage;
const shareTitle = packageJson.name.replace(/^@[^/]+\//, '');
const shareText = `Check out ${shareTitle} — a Mantine UI extension for React`;
const encodedUrl = encodeURIComponent(shareUrl);
const encodedText = encodeURIComponent(shareText);
const encodedTextWithUrl = encodeURIComponent(`${shareText} ${shareUrl}`);

const shareSvgProps = { width: 18, height: 18, fill: 'currentColor', 'aria-hidden': true } as const;

const shareLinks = [
  {
    key: 'x',
    label: 'Share on X',
    href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    icon: (
      <svg viewBox="0 0 24 24" {...shareSvgProps}>
        <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'Share on LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    icon: (
      <svg viewBox="0 0 16 16" {...shareSvgProps}>
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
      </svg>
    ),
  },
  {
    key: 'facebook',
    label: 'Share on Facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    icon: (
      <svg viewBox="0 0 24 24" {...shareSvgProps}>
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
      </svg>
    ),
  },
  {
    key: 'bluesky',
    label: 'Share on Bluesky',
    href: `https://bsky.app/intent/compose?text=${encodedTextWithUrl}`,
    icon: (
      <svg viewBox="0 0 24 24" {...shareSvgProps}>
        <path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" />
      </svg>
    ),
  },
  {
    key: 'threads',
    label: 'Share on Threads',
    href: `https://www.threads.net/intent/post?text=${encodedTextWithUrl}`,
    icon: (
      <svg viewBox="0 0 24 24" {...shareSvgProps}>
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
      </svg>
    ),
  },
];

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
          <Group gap="sm" justify="center">
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

          <Stack gap={8} align="center" mb="xl">
            <SubTitle>Share this extension</SubTitle>
            <Group gap="xs" justify="center">
              {shareLinks.map((item) => (
                <ActionIcon
                  key={item.key}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="subtle"
                  color="gray"
                  size="lg"
                  radius="xl"
                  aria-label={item.label}
                >
                  {item.icon}
                </ActionIcon>
              ))}
            </Group>
          </Stack>
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
