import fs from 'fs-extra';
import signale from 'signale';
import { $ } from 'zx';
import path from 'node:path';

async function generateDts() {
  try {
    await $`yarn tsc --project tsconfig.build.json`;
    // The `import` condition's types. A copy of index.d.ts would not do: under
    // moduleResolution node16/nodenext a .d.mts is an ES module, where its
    // extensionless specifiers ('./Led') resolve to nothing and every export
    // silently becomes `any`. `export *` carries no default export; the entry has none.
    await fs.writeFile(
      path.join(process.cwd(), 'package/dist/types/index.d.mts'),
      "export * from './index.js';\n"
    );
  } catch (err) {
    signale.error('Failed to generate d.ts files');
    signale.error(err);
    process.exit(1);
  }
}

generateDts();
