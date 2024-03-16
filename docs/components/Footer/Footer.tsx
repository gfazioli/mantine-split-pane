import { Anchor, Center, Container, Group, Stack, Text } from '@mantine/core';
import { IconComponents, IconEye, IconNews } from '@tabler/icons-react';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <footer>
      <Container className={classes.root} fluid m={0} p={0}>
        <Container py={32}>
          <Stack align="center">
            <Group gap={4}>
              <IconEye color="white" size={24} />
              <Text variant="gradient">
                You can visit the Mantine{' '}
                <Anchor
                  target="_blank"
                  variant="gradient"
                  gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                  href="https://mantine.dev"
                >
                  documentation
                </Anchor>{' '}
                to learn more about Mantine
              </Text>
            </Group>
            <Group gap={4}>
              <IconComponents color="white" size={24} />
              <Text variant="gradient">
                Check more Mantine components in{' '}
                <Anchor
                  target="_blank"
                  variant="gradient"
                  gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                  href="https://mantine-extensions.vercel.app/"
                >
                  Mantine Extensions
                </Anchor>
              </Text>
            </Group>
            <Group gap={4}>
              <IconNews color="white" size={24} />
              <Text variant="gradient">
                Subscribe to my newsletter to get updates about new Mantine components and features
                on{' '}
                <Anchor
                  target="_blank"
                  variant="gradient"
                  gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                  href="https://undolog.substack.com/"
                >
                  Undolog
                </Anchor>{' '}
                website
              </Text>
            </Group>
          </Stack>
          <Center>
            <iframe
              src="https://undolog.substack.com/embed"
              width="100%"
              height="320"
              style={{ border: 'none', background: 'white' }}
            />
          </Center>
        </Container>
      </Container>
    </footer>
  );
}
