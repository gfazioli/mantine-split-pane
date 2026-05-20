import fs from 'fs-extra';
import path from 'path';
import signale from 'signale';

/**
 * Copies the repo-root `social.jpeg` (used by GitHub for the repository social
 * preview) into `docs/public/social.jpeg` so the deployed docs site can serve
 * it from an absolute URL and use it as the og:image / twitter:image.
 *
 * Runs as part of `docs:build` — silent no-op if the source is missing.
 */
const ROOT = process.cwd();
const SRC = path.join(ROOT, 'social.jpeg');
const DEST_DIR = path.join(ROOT, 'docs', 'public');
const DEST = path.join(DEST_DIR, 'social.jpeg');

if (!fs.existsSync(SRC)) {
  signale.warn(`copy-social-image: ${SRC} not found, skipping.`);
  process.exit(0);
}

fs.ensureDirSync(DEST_DIR);
fs.copyFileSync(SRC, DEST);
signale.success(`copy-social-image: ${SRC} → ${DEST}`);
