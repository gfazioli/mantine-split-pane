import path from 'node:path';
import fs from 'fs-extra';
import { execa } from 'execa';
import signale from 'signale';

async function generateDts() {
  try {
    await execa('yarn', ['tsc', '--project', 'tsconfig.build.json']);
    await fs.copy(
      path.join(process.cwd(), 'package/dist/types/index.d.ts'),
      path.join(process.cwd(), 'package/dist/types/index.d.mts')
    );
  } catch (err) {
    signale.error('Failed to generate d.ts files');
    signale.error(err);
    process.exit(1);
  }
}

generateDts();
