import '@mantine/core/styles.css';
// Core
import '@mantine/code-highlight/styles.css';
import '@mantinex/demo/styles.css';
import '@mantinex/mantine-header/styles.css';
import '@mantinex/mantine-logo/styles.css';
// Component
import '@gfazioli/mantine-split-pane/styles.css';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';
import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import favicon from '../assets/favicon.svg';
import { Footer } from '../components/Footer';
import { PACKAGE_DATA } from '../data';
import { theme } from '../theme';

// Absolute URL of the deployed docs site (e.g. https://gfazioli.github.io/mantine-led/).
// Set at build time by docs/next.config.mjs from the package.json `repository` field.
// Falls back to the homepage in PACKAGE_DATA so dev-mode SSR doesn't render an empty URL.
const HOMEPAGE = (process.env.DOCS_HOMEPAGE || `${PACKAGE_DATA.repositoryUrl}/`).replace(
  /\/+$/,
  '/'
);
const OG_IMAGE = `${HOMEPAGE}social.jpeg`;
const PAGE_TITLE = PACKAGE_DATA.packageName;
const PAGE_DESCRIPTION = PACKAGE_DATA.packageDescription;

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    themes: [],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href={favicon.src} />

        {/* Open Graph (Facebook, LinkedIn, Slack, Discord, …) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={HOMEPAGE} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <meta property="og:image:alt" content={PAGE_TITLE} />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <Component {...pageProps} />
      </CodeHighlightAdapterProvider>
      <Footer />
    </MantineProvider>
  );
}
