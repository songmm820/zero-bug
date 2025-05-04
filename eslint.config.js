import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {},
    ignores: [],
    settings: {
      react: {
        // pragma: 'React',
        version: 'detect'
      }
    },
    rules: {
      // 关闭 React 18 后不再需要的规则
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // 禁止使用 var
      'no-var': 'error',
      // 禁止使用未声明的变量
      'no-undef': 'error',
      // console log 警告
      'no-console': 'warn',
      // 最后一行不使用逗号
      'comma-dangle': ['error', 'never']
    }
  },
  eslintPluginPrettierRecommended
]
// https://eslint.orga/docs/latest/rules/
