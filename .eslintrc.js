module.exports = {
  extends: ['next/core-web-vitals', 'prettier', 'plugin:unicorn/recommended'],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '#*/**',
            group: 'internal',
            position: 'after',
          },
        ],

        pathGroupsExcludedImportTypes: ['type'],
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'index',
          'sibling',
          'parent',
          'object',
          'type',
        ],
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          props: false,
          args: false,
          req: false,
          res: false,
          env: false,
        },
      },
    ],
  },
}
