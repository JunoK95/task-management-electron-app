import { defineConfig } from 'eslint/config';
import tseslint from '@electron-toolkit/eslint-config-ts';
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginImport from 'eslint-plugin-import';

export default defineConfig(
  // --------------------------------------------------
  // Global ignores
  // --------------------------------------------------
  { ignores: ['**/node_modules', '**/dist', '**/out'] },

  // --------------------------------------------------
  // Base configs
  // --------------------------------------------------
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],

  // --------------------------------------------------
  // React settings
  // --------------------------------------------------
  {
    settings: {
      react: {
        version: 'detect'
      },
      // 👇 Required for eslint-plugin-import + TS paths
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', './tsconfig.web.json', './tsconfig.node.json']
        }
      }
    }
  },

  // --------------------------------------------------
  // TS / React rules
  // --------------------------------------------------
  {
    files: ['src/renderer/**/*.{ts,tsx}'],
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', './tsconfig.web.json', './tsconfig.node.json']
        }
      }
    },
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
      import: eslintPluginImport
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-empty-pattern': 'off',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  },

  // --------------------------------------------------
  // Prettier LAST (always last)
  // --------------------------------------------------
  eslintConfigPrettier
);
