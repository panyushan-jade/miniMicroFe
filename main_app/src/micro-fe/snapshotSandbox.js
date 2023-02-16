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