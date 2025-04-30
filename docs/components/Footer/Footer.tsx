import {
  IconBrandGithubFilled,
  IconBrandMantine,
  IconBrandX,
  IconMailHeart,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Anchor,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import packageJson from '../../../package/package.json';
import { AnimateBadge } from './AnimateBadge';
import { ecosystem, highlights, resources } from './links';
import classes from './Footer.module.css';

type FooterProps = {};

type VerticalLink = {
  key: string;
  title: string;
  href: string;
  newWindow?: boolean;
  new?: boolean;
};

const VerticalLinks = ({ list }: { list: VerticalLink[] }) => {
  return (
    <>
      {list
        .filter((item) => !packageJson.homepage.includes(item.href))
        .map((item) => (
          <Group key={item.key}>
            <Anchor
              className={classes.columnAnchor}
              href={item.href}
              target={item.newWindow ? '_blank' : ''}
            >
              {item.title}
            </Anchor>
            {item.new && <AnimateBadge />}
          </Group>
        ))}
    </>
  );
};

export const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={classes.contentFooter}>
      <Container className={classes.footer} size="lg">
        <Grid grow>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Stack gap="xs">
              <ThemeIcon>
                <img
                  style={{
                    borderRadius: '8px',
                  }}
                  width={36}
                  src="https://substackcdn.com/image/fetch/f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d483192-7bf9-4d61-aaf7-ced1a3f4adf8_1024x1024.png"
                  alt="Undolog"
                />
              </ThemeIcon>
              <Text fz={13} mr={64}>
                This Mantine UI extension component has been create to extend the capabilities of
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
                <ActionIcon variant="subtle" component="a" href="https://undolog.substack.com/">
                  <IconMailHeart size={24} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={2}>
            <Stack gap="xs">
              <Title className={classes.title} order={6}>
                HIGHLIGHTS
              </Title>
              <VerticalLinks list={highlights} />
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={2}>
            <Stack gap="xs">
              <Title className={classes.title} order={6}>
                RESOURCES
              </Title>
              <VerticalLinks list={resources} />
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={2}>
            <Stack gap="xs">
              <Title className={classes.title} order={6}>
                ECOSYSTEM
              </Title>
              <VerticalLinks list={ecosystem} />
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my={16} className={classes.lastDivider} />

        <Group justify="space-between">
          <iframe
            src="https://github.com/sponsors/gfazioli/button"
            title="Sponsor gfazioli"
            height="32"
            width="114"
            style={{ border: 0, borderRadius: '6px' }}
          />

          <Group justify="right">
            <Text fz={12} inline>
              Made with ❤️ by{' '}
              <Anchor fz={13} href="https://undolog.com/">
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
