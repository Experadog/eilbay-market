const base = {
  indent: 'off',
  'eol-last': ['error', 'always'],
  'no-use-before-define': 'off',
  'no-undef': 'off',
  'comma-dangle': ['error', 'always-multiline'],
  'jsx-quotes': ['error', 'prefer-double'],
  'node/no-callback-literal': 'off',
  'no-useless-return': 'off',
  'no-redeclare': 'off',
  camelcase: 'off',
  quotes: ['error', 'single'],
}

const typescript = {
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/object-curly-spacing': [1, 'always'],
  '@typescript-eslint/semi': ['warn', 'never'],
  '@typescript-eslint/indent': [1, 2, {
    SwitchCase: 1,
  }],
  '@typescript-eslint/member-delimiter-style': ['warn', {
    multiline: {
      delimiter: 'none',
      requireLast: true,
    },
    singleline: {
      delimiter: 'comma',
      requireLast: false,
    },
  }],
  '@typescript-eslint/type-annotation-spacing': [1, { after: true }],
  '@typescript-eslint/no-redeclare': ['warn'],
}

const imports = {
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'index', 'sibling', 'object', 'type'],

      'newlines-between': 'always',

      pathGroups: [
        {
          pattern: 'react**',
          group: 'external',
          position: 'before',
        },
        {
          pattern: '@/**',
          group: 'internal',
        },
        {
          pattern: '@/',
          group: 'external',
        },
      ],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },

      pathGroupsExcludedImportTypes: ['react'],
    },
  ],
}

const react = {
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react/display-name': 'off',
  'react/jsx-closing-bracket-location': 1,
  // 'react/jsx-curly-newline': 1,
  'react/jsx-indent': ['warn', 2, {
    indentLogicalExpressions: true,
  }],
  'react/jsx-indent-props': ['warn', 2],
  'react/jsx-wrap-multilines': ['warn', {
    arrow: 'parens-new-line',
    condition: 'parens-new-line',
    logical: 'parens-new-line',
    // prop: 'parens-new-line',
  }],
  'no-console': ['warn', { allow: ['error'] }],
  'react/jsx-curly-spacing': [1, {
    when: 'never',
    // children: {
    //   when: 'never',
    // },
  }],
}

/**
     * @type { import('eslint').ESLint.Options['baseConfig'] }
     */
const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'next',
  ],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },

  plugins: [
    'react',
    '@typescript-eslint',
  ],

  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },

  rules: {
    ...base,
    ...typescript,
    ...imports,
    ...react,
  },
}

module.exports = config
