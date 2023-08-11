<template>
  <div class="about">
    <h1>This is parent home page</h1>
    <div class="container-wrap">
      <div id="appContainer1"></div>
      <div id="appContainer2"></div>
    </div>
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
import { useAppStore, useUserStore } from '../../store/index'
import PubSub from 'pubsub-js'

export default {
  mounted () {
    loadMicroApp({
      name: 'sub-vue-1',
      entry: process.env.VUE_APP_SUB_VUE,
      container: '#appContainer1',
      props: { useAppStore, useUserStore, globalEvent: PubSub }
    })
    loadMicroApp({
      name: 'sub-vue-2',
      entry: process.env.VUE_APP_SUB_VUE_2,
      container: '#appContainer2',
      props: { useAppStore, useUserStore, globalEvent: PubSub }
    })
  }
}
</script>

<style scoped>
h1 {
  color: green;
}
.container-wrap {
  /* width: 1200px; */
  margin: 0 auto;
  display: flex;
  /* height: 710px; */
}
#appContainer1 {
  /* width: 600px; */
  height: 300px;
  background: #f8b4b4;
}
#appContainer2 {
  /* width: 600px; */
  height: 300px;
  background: #d3f8b4;
}
</style>
