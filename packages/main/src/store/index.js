import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

// 模块
import { useUserStore } from './modules/user'
import { useAppStore } from './modules/app'

const pinia = createPinia()
Vue.use(PiniaVuePlugin)

export function setupStore (app) {
  app.use(pinia)
}

export { useUserStore, useAppStore, pinia }
