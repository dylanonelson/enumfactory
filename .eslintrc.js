module.exports = {
  'env': {
    browser: true,
    commonjs: true,
    es6: true,
    mocha: true,
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'installedESLint': true,
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'no-unused-vars': [2, { 'args': 'none' }],
    'comma-dangle': [2, 'always-multiline'],
  }
};
