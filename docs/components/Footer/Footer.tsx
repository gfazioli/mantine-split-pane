import { IconBrandMantine, IconComponents, IconMailStar } from '@tabler/icons-react';
import { Button, Center, Container, Divider, Group } from '@mantine/core';
import classes from './Footer.module.css';

interface FooterProps {
  children?: React.ReactNode;
}

export function Footer({ children }: FooterProps) {
  return (
    <footer>
      <Container className={classes.root} fluid m={0} p={0}>
        <Container py={32}>
          <Group my={18} justify="center">
            <iframe
              src="https://github.com/sponsors/gfazioli/button"
              title="Sponsor gfazioli"
              height="32"
              width="114"
              style={{ border: 0, borderRadius: '6px' }}
            ></iframe>
            <Divider orientation="vertical" color="dark.5" />
            <Button
              component="a"
              href="https://mantine.dev"
              target="_blank"
              variant="light"
              color="blue"
              radius={6}
              size="sm"
              h={32}
              leftSection={<IconBrandMantine />}
            >
              Mantine Documentation
            </Button>
            <Divider orientation="vertical" color="dark.5" />
            <Button
              component="a"
              href="https://mantine-extensions.vercel.app/"
              target="_blank"
              variant="light"
              color="lime"
              size="sm"
              h={32}
              leftSection={<IconComponents />}
            >
              More Extensions
            </Button>
            <Divider orientation="vertical" color="dark.5" />
            <Button
              component="a"
              href="https://undolog.com/"
              target="_blank"
              variant="light"
              color="yellow"
              size="sm"
              h={32}
              leftSection={<IconMailStar />}
            >
              Undolog
            </Button>
          </Group>
          <Center>
            <iframe
              src="https://undolog.com/embed"
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
