module.exports = {
  extends: require.resolve('eslint-config-airbnb'),
  rules: {
      'react/jsx-filename-extension': [2, { 'extensions': ['gemini.js', '.jsx'] }]
  },
  globals: {
      sinon: true
  }
};