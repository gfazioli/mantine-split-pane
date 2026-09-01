import createMDX from '@next/mdx';
import fs from 'fs-extra';
import signale from 'signale';

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-slug'],
  },
});

let repository;

try {
  const packageJson = fs.readJsonSync('../package/package.json');
  repository = packageJson.repository.split('/').at(-1).replace('.git', '');
} catch {
  signale.error('Failed to read repository field of package/package.json\n');
  process.exit(1);
}

const HOMEPAGE = `https://gfazioli.github.io/${repository}/`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `next dev` scaffolds AGENTS.md + CLAUDE.md in this directory whenever it detects an
  // AI coding agent (CLAUDECODE / AI_AGENT / CURSOR_AGENT / … — see
  // next/dist/compiled/@vercel/detect-agent). The files are untracked, so they dirty the
  // working tree and `release.ts` then aborts with "Working directory is not clean".
  // Gated on this flag in next/dist/server/lib/start-server.js.
  agentRules: false,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? `/${repository}` : undefined,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  env: {
    // Absolute URL of the deployed docs site — used by _app.tsx to build
    // og:url / og:image absolute URLs (social crawlers don't resolve basePath).
    DOCS_HOMEPAGE: HOMEPAGE,
  },
};

export default withMDX(nextConfig);
