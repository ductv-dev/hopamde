// @ts-check

// @ts-ignore
import eslintConfigPrettier from 'eslint-config-prettier';
// @ts-ignore
import drizzle from 'eslint-plugin-drizzle';
import * as pluginImportX from 'eslint-plugin-import-x';
// @ts-ignore
import onlyWarn from 'eslint-plugin-only-warn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '**/__poc__*', '*.generated.ts'],
  },
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      onlyWarn,
      drizzle,
    },
  },
  {
    files: ['*.js', '*.mjs', '*.cjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    rules: {
      'no-console': 'error',
      'drizzle/enforce-delete-with-where': [
        'error',
        { drizzleObjectName: 'db' },
      ],
      'drizzle/enforce-update-with-where': [
        'error',
        { drizzleObjectName: 'db' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      'import-x/extensions': ['error', 'always', { ignorePackages: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
    },
  },
);
