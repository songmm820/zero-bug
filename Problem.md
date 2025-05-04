
## 在推送代码到github时，出现443超时错误。
### 如果你开启了VPN，很可能是因为代理的问题
1. git config --global http.proxy 127.0.0.1:7890
2. git config --global https.proxy 127.0.0.1:7890

注意：端口号需要根据你的代理设置进行调整。


## Git CZ提交规范
### 1.为什么使用czg而不是git-cz
czg是git-cz的升级版，不必依赖 commitlint 它提供了更多的功能和更好的用户体验。例如，czg支持自定义提交类型、自定义提交范围、自定义提交主题等。这使得我们可以更灵活地控制提交信息，从而提高代码质量和可维护性。


## Hotjar监控地址
https://insights.hotjar.com/sites/6391601/overview
邮箱：mmsong@yeah.net
密码：Smm129946902.
