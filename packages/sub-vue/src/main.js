import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import { store as commonStore } from 'common'
import VueRouter from 'vue-router'
import { registerStore } from './store/global/userStore'
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.config.productionTip = false
let instance = null
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

function render (props = {}) {
  const { container, routerBase } = props

  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes

  })
  Vue.prototype.$globalEvent = props.globalEvent
  instance = new Vue({
    router,
    render: (h) => h(App),
    pinia
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap (props) {
  console.log('[vue] vue app bootstraped', props)
}

export async function mount (props) {
  console.log('[vue] props from main framework', props)
  console.log('commonStore', commonStore)
  render(props)
  registerStore(props.useUserStore)
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
