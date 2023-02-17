export class SnapshotSandbox{
    constructor(name){
      this.name = name
      this.proxy = window
      this.snapshotWindow = {}
      this.modifyMap = {}
    }
    active(){
      this.snapshotWindow = {}
      for(let key in window){
        this.snapshotWindow[key] = window[key]
      }
      for(let key in this.modifyMap){
        window[key] = this.modifyMap[key]
      }
    }
    inactive(){
      for(let key in window){
        if(this.snapshotWindow[key] !== window[key]){
          // 记录变化的
          this.modifyMap[key] = window[key]
          // 恢复快照时值
          window[key] = this.snapshotWindow[key]
        }
      }
    }
  }

  export class ProxySandbox{
    active(){
      this.sandboxRunning = true
    }
    inactive(){
      this.sandboxRunning = false
    }
    constructor(name){
      this.name = name
      const rawWindow = window 
      const fakeWindow = {}
      const proxy = new Proxy(fakeWindow, {
        set: (target, prop, value)=>{
          if(this.sandboxRunning){
            target[prop] = value
            return true
          }
        },
        get: (target, prop)=>{
          // 如果 fakeWindow 里面有，就从 fakeWindow 里面取，否则，就从外面的 window 里面取
          let value = prop in target ? target[prop] : rawWindow[prop]
          return value
        }
      })
      this.proxy = proxy
    }
  }