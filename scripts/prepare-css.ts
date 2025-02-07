import path from 'node:path';
import fs from 'fs-extra';
import signale from 'signale';

const rollupCssFilePath = path.join(process.cwd(), './package/dist/esm/index.css');

if (!fs.existsSync(rollupCssFilePath)) {
  signale.error('CSS file not found. Please run `yarn build` first.');
  process.exit(1);
}

const content = fs.readFileSync(rollupCssFilePath, 'utf-8');

fs.writeFileSync(path.join(process.cwd(), './package/dist/styles.css'), content);
fs.writeFileSync(
  path.join(process.cwd(), './package/dist/styles.layer.css'),
  `@layer mantine-split-pane {${content}}`
);

fs.removeSync(rollupCssFilePath);
fs.removeSync(path.join(process.cwd(), './package/dist/cjs/index.css'));
