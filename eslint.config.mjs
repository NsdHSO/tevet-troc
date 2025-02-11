import nx from '@nx/eslint-plugin';

export default [
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',  // Example
      '@typescript-eslint/no-explicit-any': 'off', // Example
      semi: ['error', 'always'], // You can override rules here too
      'eol-last': ['error', 'always'], // Enforce newline at end of file
      'no-extra-semi': 'error',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'], // Target specific file types
    rules: {
      // Override or add JavaScript-specific rules if needed
      semi: ['error', 'always'], // You can override rules here too
      'eol-last': ['error', 'always'], // Enforce newline at end of file
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
