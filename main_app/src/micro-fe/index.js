
import { rewriteRouter } from './rewriteRouter';

let _apps = [];

export const getApps = () => _apps

// 注册微应用
export const registerMicroApps = (apps) => {
    _apps = apps
}

export const start = () => {
    // 微前端运行原理
    /* 
        1、、监视路由变化
            hash 路由  hashchange
            history路由 
                history.go/back/forward 使用popstate  监听浏览器前进后退 或js中使用前面的方法
                pushState/replaceState 需要通过函数重写去劫持
        2、匹配子应用
        3、加载子应用
        4、渲染子应用
    */
   rewriteRouter(_apps)
        
}