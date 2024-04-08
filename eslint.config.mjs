import js from '@eslint/js'

export default [
  {
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: 'module',
    },
  },
  {
    ignores: [
      "dist/**"
    ],
  },
  js.configs.recommended,
]
