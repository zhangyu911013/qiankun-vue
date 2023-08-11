<template>
  <div></div>
</template>
<script>
import { loadMicroApp, addGlobalUncaughtErrorHandler } from 'qiankun'
import { microApps, registerApps } from '@/plugins'

export default {
  name: 'MicroApp',
  data () {
    return {
      microList: {},
      state: {
        elementLink: null
      }
    }
  },
  watch: {
    '$route.path': function (newValue) {
      // this.activationHandleChange(newValue)
    }
  },
  methods: {
    async activationHandleChange (path) {
      console.log('activationHandleChange', path)
      const activeRules = microApps.map((app) => app.activeRule)
      const isMicro = activeRules.some((rule) => path.startsWith(rule))
      if (!isMicro) return
      const microItem = microApps.find((app) =>
        path.startsWith(app.activeRule.toString())
      )
      if (!microItem) return

      const current = this.microList[microItem.activeRule.toString()]
      if (current) return

      const micro = loadMicroApp({ ...microItem })
      this.microList[microItem.activeRule.toString()] = micro

      try {
        await micro.mountPromise
      } catch (e) {
        console.error('=======', e)
      }
    }
  },
  mounted () {
    if (window.qiankunStarted) return
    // qiankun全局异常捕获
    addGlobalUncaughtErrorHandler((event) => console.log(event))
    window.qiankunStarted = true
    registerApps()
    // this.activationHandleChange(this.$route.path)
  },
  beforeDestroy () {
    window.qiankunStarted = false
    Object.values(this.microList).forEach((mic) => {
      mic.unmount()
    })
  }
}
</script>
