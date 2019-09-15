module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "@nuxtjs"
  ],
  // required to lint *.vue files
  plugins: ['vue', 'prettier'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': [
      'error',
      {
        svg: 'never',
        html: {
          void: 'any'
        }
      }
    ],
    'vue/max-attributes-per-line': [
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
      {
        singleline: 3
      }
    ]
  }
}
