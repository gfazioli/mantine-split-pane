import fs from 'fs-extra';
import path from 'node:path';

fs.writeFileSync(path.join(process.cwd(), 'docs/out/.nojekyll'), '');
