module.exports = {
  root: true,
  plugins: ['eslint-plugin-cypress'],
  extends: ['plugin:cypress/recommened'],
  env: {
    'cypress/globals': true
  }
}
