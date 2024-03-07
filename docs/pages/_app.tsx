import '@mantinex/mantine-header/styles.css';

import '@mantinex/mantine-logo/styles.css';

import '@mantinex/demo/styles.css';

import '@mantine/core/styles.css';

import '@mantinex/shiki/styles.css';

import { MantineProvider } from '@mantine/core';
import { ShikiProvider } from '@mantinex/shiki';
import { AppProps } from 'next/app';
import Head from 'next/head';
import favicon from '../assets/favicon.svg';
import { theme } from '../theme';

import '@gfazioli/mantine-split-pane/styles.css';
import { Footer } from '../components/Footer';

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
