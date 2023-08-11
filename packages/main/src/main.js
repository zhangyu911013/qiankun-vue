/* eslint-disable */
import Vue from 'vue'
import App from './views/app/App.vue'
import 'nprogress/nprogress.css'
import { pinia } from './store/index'
import router from './router'

import '@assets/scss/reset.css'

Vue.config.productionTip = false

const instance = new Vue({
  render: h => h(App),
  router,
  pinia
}).$mount('#app')
