/**
 * 导入prettier的ESLint推荐配置
 * 这是为了确保代码风格与prettier的格式化风格保持一致
 * ESLint是一个用于识别和报告JavaScript代码中模式的工具，以促进代码一致性和避免错误
 * Prettier是一个有自己配置的代码格式化工具，这个导入的配置将ESLint规则调整为与Prettier的格式化规则一致
 */

import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
// 导入eslint配置项以配合Prettier使用
import eslintConfigPrettier from 'eslint-config-prettier'

/**
 * ESLint配置数组，用于定义代码检查规则
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  // 应用JavaScript ESLint推荐的规则配置
  pluginJs.configs.recommended,
  // 应用TypeScript ESLint推荐的规则配置
  ...tseslint.configs.recommended,
  // 应用React ESLint推荐的规则配置
  pluginReact.configs.flat.recommended,
  // 引入ESLint配置中的Prettier规范
  eslintConfigPrettier,
  // 使用 ESLint 插件 Prettier 的推荐配置
  eslintPluginPrettierRecommended,
  // 配置忽略项，指定在某些操作或任务中不应被处理的目录或文件
  { ignores: ['dist/**', 'node_modules/**'] },
  // 定义文件匹配模式，仅对指定的文件类型应用以下规则
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
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
  // 配置全局变量，使用浏览器环境的全局变量
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // 添加自定义的全局变量
        Tools: 'readonly'
      }
    }
  }
]
// https://eslint.orga/docs/latest/rules/
