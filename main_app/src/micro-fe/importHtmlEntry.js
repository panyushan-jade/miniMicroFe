
/* 
    解析html 提取script 并执行
    return {
        template
        getExternalScripts
        execScripts
    }
*/
import { fetchResource } from './fetchResource'
export const importHtmlEntry = async (entry) => {
    const template = document.createElement('div')
    const html = await fetchResource(entry)
    template.innerHTML = html;
    // 获取所有script
    const scripts = template.querySelectorAll('script')
    async function getExternalScripts(){
        return Promise.all(Array.from(scripts).map( script => {
            const src = script.getAttribute('src')
            if(!src){  // 行内script
                return Promise.resolve(script.innerHTML)
            }else{
                return fetchResource(src.startsWith('http' || 'https') ? src : entry+src)
            }
        }))
    }

    async function execScripts(){
        const scripts = await getExternalScripts()
        const module = {exports:{}}
        const exports = module.exports
        scripts.forEach( script =>  {
            // script 通过umd打包 且eval可以访问外部变量 没有作用域 
            eval(script)
        })
        return module.exports
    }

    return {
        template,
        getExternalScripts,
        execScripts
    }
    // 
}