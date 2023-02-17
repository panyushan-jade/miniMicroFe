
import { importHtmlEntry } from './importHtmlEntry';
import { getPrevRoute } from './rewriteRouter';
import { SnapshotSandbox,ProxySandbox } from './snapshotSandbox';
/* 
    处理路由变化
*/
export const handleRouter = async (apps) => {
    //获取元素
    var headDom = document.getElementsByTagName("head")[0];
    var config = { childList: true};
    var observer = new MutationObserver(function (mutationsList, observer) {
        console.log('mutationsList: ', mutationsList);
        if(window.location.pathname !== '/'){
            // 因为没有用router 这里要判断一下
            for (var mutation of mutationsList){
                if(!mutation.addedNodes[0]) return 
                const showRoot = document.querySelector('#subapp_root').shadowRoot
                showRoot.appendChild(mutation.addedNodes[0])
            }
        }
    });
    //开始观测
    observer.observe(headDom, config);
    // 卸载上一个应用
    const preApps = apps.find( item => getPrevRoute().startsWith(item.activeRule))
    if(preApps){
        await unmount(preApps)
        const preDom = document.querySelector(preApps.container);
        preDom.innerHTML = ''

    }
    // 获取当前路径 匹配注册表
    const app = apps.find( app => window.location.pathname.startsWith(app.activeRule))
    if(!app) return
    // 加载子应用 请求获取html css js
    // 不能使用innerHTML 浏览器出于安全考虑 innerHTML 中的script不会加载和执行
    // 这里需要手动加载js 并执行
    const { template,getExternalScripts,execScripts} = await importHtmlEntry(app.entry,app.container)
    const container = document.querySelector(app.container)
    container.appendChild(template)
    // 设置全局变量 
    window.__POWERED_BY_QIANKUN__ = true;
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry.endsWith('/') ? app.entry : app.entry+'/';
    // 拿到子应用的钩子 并调用
    const sandbox = new SnapshotSandbox();
    const proxySandbox = new ProxySandbox('test');
    // sandbox.active()
    proxySandbox.active()
    const subAppHooks = await execScripts(proxySandbox.proxy);
    app.bootstrap = subAppHooks.bootstrap;
    app.mount = subAppHooks.mount;
    app.unmount = subAppHooks.unmount;
    await bootstrap(app);
    await mount(app);
//配置选项
    
}


export async function bootstrap(app) {
    app.bootstrap && (await app.bootstrap(app))
}
export async function mount(app) {
    app.mount && (await app.mount({
        container: document.querySelector('#subapp_root').shadowRoot
    }))
}
export async function unmount(app) {
    app.unmount && (await app.unmount({
        container: document.querySelector('#subapp_root').shadowRoot
    }))
}