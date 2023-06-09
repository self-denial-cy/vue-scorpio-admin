require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser'
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue']
      }
    }
  ],
  rules: {
    'no-undef': 0,
    'no-unused-vars': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0,
    'vue/component-definition-name-casing': 0,
    '@typescript-eslint/no-unused-vars': 0
  }
};
