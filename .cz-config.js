module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复问题' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式（不影响功能的变动）' },
    { value: 'refactor', name: 'refactor: 重构（即不影响功能的代码改动）' },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    其他变动' }
  ],
  messages: {
    type: '选择提交类型：'
  },
  footer: '请输入相关的变更描述（例如修复的 Bug、增加的功能等）'
}
