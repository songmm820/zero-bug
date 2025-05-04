// prettier.config.js
export default {
  // 是否在语句末尾添加分号<bool>，默认false
  semi: false,
  // 使用单引号而不是双引号<bool>，默认false
  singleQuote: true,
  // 指定每个缩进级别的空格数<int>，默认2
  tabWidth: 2,
  //  最后一行不使用逗号
  trailingComma: 'none',
  // 在 JSX 中使用单引号而不是双引号<bool>，默认false
  jsxSingleQuote: false,
  // 不同系统统一换行符
  endOfLine: 'auto',
  // 指定prettier将换行的行长<int>，默认80
  printWidth: 180,
  // 用制表符而不是空格缩进行<bool>，默认false
  useTabs: false,
  // 对象字面量中括号之间的空格<bool>，默认true
  bracketSpacing: true,
  // Prettier可以在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了。在使用 --require-pragma参数处理一连串的文件时这个功能将十分有用。如果文件顶部已经有一个doclock，这个选项将新建一行注释，并打上@format标记<bool>，默认false
  insertPragma: false
}
