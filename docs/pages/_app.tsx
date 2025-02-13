import '@gfazioli/mantine-split-pane/styles.css';

import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantinex/demo/styles.css';
import '@mantinex/mantine-header/styles.css';
import '@mantinex/mantine-logo/styles.css';

import { ShikiProvider } from '@mantinex/shiki';

import '@mantinex/shiki/styles.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import favicon from '../assets/favicon.svg';
import { Footer } from '../components/Footer';
import { theme } from '../theme';

async function loadShiki() {
  const { getHighlighter } = await import('shikiji');
  const shiki = await getHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
  });

  return shiki;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Mantine Split pane</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <ShikiProvider loadShiki={loadShiki}>
        <Component {...pageProps} />
      </ShikiProvider>
      <Footer />
    </MantineProvider>
  );
}
