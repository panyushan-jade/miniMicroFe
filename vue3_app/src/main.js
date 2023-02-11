import '../public-path';
import { createApp } from 'vue'
import App from './App.vue'



let instance = null;
function render(props = {}) {
  const { container } = props;

  instance = createApp(App);
  instance.mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
    render();
  }
  
  export async function bootstrap() {
    console.log('[vue3_app] vue3_app app bootstraped');
  }
  export async function mount(props) {
    console.log('[vue3_app] props from main framework', props);
    render(props);
  }
  export async function unmount() {
    console.log('instance===>',instance);
    instance.unmount()
    // instance.$destroy();
    // instance.$el.innerHTML = '';
    instance = null;
  }

