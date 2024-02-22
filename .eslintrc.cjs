module.exports = {
  extends: ['mantine'],
  rules: {
    'import/extensions': 'off',
    'import/no-relative-packages': 'off',
    '@typescript-eslint/no-loop-func': 'off',
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
