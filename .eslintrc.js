module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  ignorePatterns: [
    ".nuxt",
    "coverage",
    "dist",
    "node_modules",
    "tmp"
  ],
  // add your custom rules here
  rules: {
  }
}
