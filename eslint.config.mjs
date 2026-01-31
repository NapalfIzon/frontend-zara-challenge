import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'coverage/**', 'next-env.d.ts']),
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-console': process.env.ENVIRONMENT === 'production' ? 'error' : 'off',
      'no-debugger': process.env.ENVIRONMENT === 'production' ? 'error' : 'off',
      'prefer-const': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    plugins: { 'unused-imports': unusedImports },
    ignores: ['node_modules/**', 'public/**', 'dist/**', 'coverage/**', '.next/**'],
  },
]);

export default eslintConfig;
