# mini-microfe


## Why Not Iframe
为什么不用 iframe，这几乎是所有微前端方案第一个会被 challenge 的问题。但是大部分微前端方案又不约而同放弃了 iframe 方案，自然是有原因的，并不是为了 "炫技" 或者刻意追求 "特立独行"。
如果不考虑体验问题，iframe 几乎是最完美的微前端解决方案了。
iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。
url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中..
全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。
其中有的问题比较好解决(问题1)，有的问题我们可以睁一只眼闭一只眼(问题4)，但有的问题我们则很难解决(问题3)甚至无法解决(问题2)，而这些无法解决的问题恰恰又会给产品带来非常严重的体验问题， 最终导致我们舍弃了 iframe 方案。

## start

```js
import { registerApplication, start } from 'mini-microfe'
registerApplication(
  [
    {
      name: 'vue3App',
      entry: '/child/vue3-app',
      container: '#container',
      activeRule: '/vue3-app',
    },
    {
      name: 'vue2App',
      entry: '/child/vue2-app',
      container: '#container',
      activeRule: '/vue2-app'
    }
  ],
  {
    beforeLoad: (app) => { console.log('before load', app.name) },
    beforeMount: (app) => { console.log('before mount', app.name) }
  }
)
start()
```

## API

- registerMicroApps(apps, lifeCycles?)
- start(opts?)