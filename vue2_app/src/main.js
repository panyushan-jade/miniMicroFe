import '../public-path';
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

let instance = null;
function render(props = {}) {
  const { container } = props;
  // console.log('哈哈哈vue2',container.querySelector('#app'));
  // console.log('哈哈哈vue2ddd',container.querySelector('.warpper').shadowRoot);
  // const cont = container.querySelector('.warpper').shadowRoot
  instance = new Vue({
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue2_app] vue2_app app bootstraped');
}
export async function mount(props) {
  console.log('[vue2_app] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}