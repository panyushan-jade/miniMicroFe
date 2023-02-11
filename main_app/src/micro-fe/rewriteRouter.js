/* 
    重写路由监听
*/
import { handleRouter } from './handleRouter';
export const rewriteRouter = (_apps) => {
    window.addEventListener('popstate', () =>{

    })
    const oldPushState = window.history.pushState
    const oldReplaceState = window.history.replaceState
    window.history.pushState = (...args) => {
        oldPushState.apply(window.history,args)
        console.log('监视pushState~~~');
        handleRouter(_apps)
    }
    window.history.replaceState = (...args) => {
        oldReplaceState.apply(window.history,args)
        console.log('监视replaceState~~~');
        handleRouter(_apps)
    }
}