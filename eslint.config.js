import astro from 'eslint-plugin-astro'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            'dist/**',
            '.astro/**',
            'node_modules/**',
            'scripts/**',
            'public/**',
        ],
    },

    // Astro plugin recommended (flat) — includes the astro-eslint-parser for *.astro files.
    ...astro.configs['flat/recommended'],

    // TypeScript files
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
        },
    },

    // Prettier integration (last so it disables conflicting rules)
    {
        plugins: { prettier: prettierPlugin },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
        },
    },
]
