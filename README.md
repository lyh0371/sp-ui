<br />
<p align="center">
<img src="https://sp-ui.vercel.app/logo.png" alt="sp-ui" height="200">
<p>

<p align="center">
<a href="https://github.com/lyh0371/sp-ui/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/lyh0371/sp-ui?style=for-the-badge"></a>
<a href="https://github.com/lyh0371/sp-ui/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/lyh0371/sp-ui?style=for-the-badge"></a>
</p>

## SP-UI🔥🔥🔥

市面上基于 vue3 的组件库已经很泛滥，而`SP-UI` 的问世不是为了做一个完整的组件库，而是对其他组件库的一种补充，`SP-UI`会去思考些更加有趣且好用的组件

## 技术选型与思考

- mongoose

使用 mongoose 组织代码。关于 mongoose，如果熟悉他的人会非常熟悉，如果不熟悉他的人会非常陌生，我感觉先认知 mongoose 比学习 mongoose 更加重要。当然在我们工作中几乎找不到使用 mongoose 去组织代码的场景（至少我没发现，或者说不必要）。其实我倒觉得开发 UI 组件库也没必要使用 mongoose。但是我觉得即使使用上也没什么坏处，那索性就用用吧。

- js 打包 rollup

使用任何一种打包工具都可以实现打包，比如 webpack vite，本来是想使用 vite 进行打包，但是发现 vite 中的 build 函数打包颗粒度过大，更加细小的颗粒度还是需要使用 rollup 进去处理，那干脆直接使用 rolup 了

- css 打包

个人觉的 css 的打包比 js 打包更加不容易理解，因为像现有的打包工具默认都支持 js 打包，而对 css 的处理都是需要使用插件。我们可以发现，现在很多大的组件库都是使用的 gulp 对 css 资源进行打包，而不是使用 rollup 插件。开始我也很奇怪，但是当你真正去实现一个组件库的时候，你就知道为什么这样做了。

- 文档

一个好的组件库必须要配一个好的文档，vitepress 就很不错

- 测试

vitest 最近比较火，正好可以学习下

## 江湖再战，风云再起 💪

如果你对这个项目感兴趣，欢迎 start 加入 👏

## 当前进度

- [x] 框架搭建
- [x] monorepo
- [x] js 打包
- [x] css 打包
- [x] 生成 ts 类型文件
- [x] 组件库文档搭建
