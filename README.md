# mini-qiankun


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