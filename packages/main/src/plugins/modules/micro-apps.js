import { microAppsConfig } from '@/configs'
import { useAppStore, useUserStore } from '@/store'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import PubSub from 'pubsub-js'

export const microApps = microAppsConfig.map((item) => {
  return {
    container: '#app-content', // 子应用挂载的div
    ...item,
    props: {
      routerBase: item.activeRule, // 下发基础路由
      globalEvent: PubSub, // 下发全局事件对象
      useAppStore,
      useUserStore
    }
  }
})
export const registerApps = () => {
  const appStore = useAppStore()

  registerMicroApps(microApps, {
    beforeLoad: (app) => {
      appStore.setLoadingMicro(true)
      console.log('before load app.name====>>>>>', app.name)
    },
    beforeMount: [
      (app) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      }
    ],
    afterMount: [
      (app) => {
        appStore.setLoadingMicro(false)
        console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
      }
    ],
    afterUnmount: [
      (app) => {
        console.log(
          '[LifeCycle] after unmount %c%s',
          'color: green;',
          app.name
        )
      }
    ]
  })

  setDefaultMountApp('/sub-vue')

  start({
    sandbox: {
      // 默认开启预加载
      prefetch: true,
      // qiankun提供的样式隔离方法（严格模式）
      strictStyleIsolation: false,
      experimentalStyleIsolation: true
    }
  })
}
