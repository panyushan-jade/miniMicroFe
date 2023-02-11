/* 
    重写路由监听
*/
import { handleRouter } from './handleRouter';


let prevRoute = '';
let nextRoute = window.location.pathname;

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

export const rewriteRouter = (_apps) => {
    window.addEventListener('popstate', () =>{
        prevRoute = nextRoute;
        nextRoute = window.location.pathname;
        handleRouter(_apps)
    })
    const oldPushState = window.history.pushState
    const oldReplaceState = window.history.replaceState
    window.history.pushState = (...args) => {
        prevRoute = window.location.pathname;
        oldPushState.apply(window.history,args);
        nextRoute = window.location.pathname;
        handleRouter(_apps)
    }
    window.history.replaceState = (...args) => {
        prevRoute = window.location.pathname;
        oldReplaceState.apply(window.history,args);
        nextRoute = window.location.pathname;
        handleRouter(_apps)
    }
}