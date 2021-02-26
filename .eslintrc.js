module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'linebreak-style': 0,
    'no-tabs': ['error', { allowIndentationTabs: false }],
    indent: ['error', 2],
    'import/no-extraneous-dependencies': 0,

  },
}
