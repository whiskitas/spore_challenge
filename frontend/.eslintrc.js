module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended'
    ],
    rules: {
      'vue/valid-v-slot': ['error', {
        allowModifiers: true
      }]
    },
    parserOptions: {
      ecmaVersion: 2020
    }
  }