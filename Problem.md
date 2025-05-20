## 关于样式的响应式处理
### 1. 主题模式切换
通过修改Html标签的data-theme属性，来切换主题模式。主题的组件颜色处理通过tailwindcss来实现，我们仅需要手动声明tailwindcss中dark变体来处理组件在不同主题下的样式。<br/>

例如：`<div class='dark:bg-[blue]'>暗色模式</div>`
<br/>
### 2. 响应式布局
通过tailwindcss的响应式布局类来实现响应式布局，我们在style.css文件中有声明三种临界设备，分别是Phone,Pad,PC。<br/>

`--breakpoint-phone: 576px;`<br/>
`--breakpoint-pad: 768px;`<br/>
`--breakpoint-pc: 992px;`<br/>

例如，如果PC设备优先：`<div class='max-phone:text-[32px]'></div>`，<br/>
表示在屏幕宽度<=576pxpx时，显示32px的字体大小。

例如，如果移动设备优先：`<div class=phone:text-[32px]'></div>`，
表示屏幕宽度>=576px时，显示32px的字体大小。


因为tailwindcss优先于移动设备，



## 在推送代码到github时，出现443超时错误。
### 如果你开启了VPN，很可能是因为代理的问题
1. `git config --global http.proxy 127.0.0.1:7890`
2. `git config --global https.proxy 127.0.0.1:7890`

注意：端口号需要根据你的代理设置进行调整。


## Git CZ提交规范
### 1.为什么使用czg而不是git-cz
czg是git-cz的升级版，不必依赖 commitlint 它提供了更多的功能和更好的用户体验。例如，czg支持自定义提交类型、自定义提交范围、自定义提交主题等。这使得我们可以更灵活地控制提交信息，从而提高代码质量和可维护性。


## Hotjar监控
hotjar是一个网站分析工具，可以帮助我们了解用户在网站上的行为。它可以帮助我们了解用户是如何找到我们的网站、他们是如何导航我们的网站、他们是如何与我们的网站交互的。这些信息可以帮助我们改进我们的网站，提高用户体验，从而提高我们的网站流量和转化率。
<br>
https://insights.hotjar.com/site/lis
<br>
密码：Smm129946902.
<br>
邮箱：mmsong@yeah.net
