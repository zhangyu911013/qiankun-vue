/* eslint-disable */
import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import { store as commonStore } from "common";
import store from "./store";
import VueRouter from "vue-router";
import { registerStore, unregisterStore } from "./store/global/userStore";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.config.productionTip = false;
let instance = null;
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

function render(props = {}) {
  const { container, routerBase } = props;

  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: "history",
    routes
  });
  Vue.prototype.$globalEvent = props.globalEvent;
  instance = new Vue({
    router,
    store,
    render: h => h(App),
    pinia
  }).$mount(container ? container.querySelector("#app") : "#app");
  
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  console.log("commonStore", commonStore);
  commonStore.globalRegister(store);
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: "我是独立运行时名字叫张三" }; // 假设登录后取到的用户信息
  store.commit("global/setGlobalState", { user: userInfo });

  render();
}

export async function bootstrap(props) {
  console.log("[vue] vue app bootstraped", props);
}

export async function mount(props) {
  console.log("[sub-vue-2] props from main framework", props);
  console.log("commonStore", commonStore);
  // commonStore.globalRegister(store, props);
  render(props);
  registerStore(props.useUserStore);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  unregisterStore()
}
