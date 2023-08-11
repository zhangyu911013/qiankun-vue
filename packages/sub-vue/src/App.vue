<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div>
      <p>当前处于<code>{{ isInQiankun ? 'qiankun' : '独立运行'}}</code>环境</p>
      <p>当前的token{{ globalUserStore.token }}</p>
      <p>自增数字{{ counter }}</p>
    </div>
    <h1>sub-vue-1</h1>
    <div class="btns">
      <template v-if="isInQiankun">
        <button @click="openSubVue">独立打开sub-vue子应用</button>
      </template>
      <button @click="changeToken">改变token</button>
      <button @click="sendEvent">发送全局事件</button>
      <button @click="increment">自增加一</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import { mapStores } from 'pinia'
import { useGlobalUserStore } from './store/global/userStore'
export default {
  data() {
    return {
      counter: 0,
    }
  },
  computed: {
    // 通过global获取user的信息
    ...mapStores(useGlobalUserStore),
    isInQiankun () {
      return window.__POWERED_BY_QIANKUN__
    }
  },
  watch: {
    'globalUserStore.token': function (newValue, oldValue) {
      console.log('Counter changed:', newValue, oldValue)
      // Do something when the counter changes, e.g., update UI or perform an action.
    }
  },
  methods: {
    // setGlobalState 是在 /common/src/store/global-register.js中定义的
    gotoSubReact () {
      history.pushState(null, 'sub-react', '/sub-react')
    },
    openSubVue () {
      if (!this.isInQiankun) {
        alert('当前已经是单独运行的子应用')
        return
      }

      // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
      window.open(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
    },
    changeToken () {
      this.globalUserStore.setToken('token' + Math.round(Math.random() * 100))
    },
    sendEvent () {
      this.$globalEvent.publish('test111', {
        data: 'test111',
        nested: {
          data: 'test111'
        }
      })
    },
    increment () {
      this.counter++
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btns{
  margin: 100px;
}
.btns button{
  margin: 0 10px;
}

</style>
