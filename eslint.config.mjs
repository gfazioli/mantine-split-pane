import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(...mantine, { ignores: ['**/.next/**', '**/*.{mjs,cjs,js,d.ts,d.mts}'] });
