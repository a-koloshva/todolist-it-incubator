export default [
    {
        extends: ['eslint:recommended', 'plugin:react/recommended'],
        parserOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            project: ['./tsconfig.json'],
        },
        ignores: ['**/node_modules', 'package-lock.json'],
        rules: {
            'import/prefer-default-export': 'off',
            'react/require-default-props': 'off',
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/return-await': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: 'react-**',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@mui/material',
                            group: 'external',
                            position: 'after',
                        },
                        {
                            pattern: '@mui/icons',
                            group: 'external',
                            position: 'after',
                        },
                        {
                            pattern: '@src/**',
                            group: 'external',
                            position: 'after',
                        },
                    ],
                },
            ],
            pathGroupsExcludedImportTypes: 0,
            distinctGroup: 'off',
            'newline-between': [
                'error',
                {
                    after: 'always',
                    before: 'always',
                    except: {
                        after: ['block', 'function'],
                        before: ['block', 'function'],
                    },
                },
            ],
        },
    },
];
