import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const eslingConfig = [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
  {
    ignores: [
      '.tmp',
      '**/.git',
      '**/.hg',
      '**/.pnp.*',
      '**/.svn',
      '**/.yarn/**',
      '**/build',
      '**/dist/**',
      '**/node_modules',
      '**/temp',
      'playwright.config.ts',
      'jest.config.js',
      '**/migrations',
      '.next/',
    ],
  },
]
export default eslingConfig
