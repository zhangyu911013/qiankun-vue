import Vue from 'vue'
import VueRouter from 'vue-router'
import MicroApp from '@/views/qiankun/micro-app.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'MicroApp',
    component: MicroApp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log('Navigating from:', from.fullPath)
  console.log('Navigating to:', to.fullPath)

  // Inspect route parameters
  console.log('Route parameters:', to.params)

  // Inspect route query
  console.log('Route query:', to.query)

  // If you want to halt navigation (for testing purposes), you can comment out the next() line.
  // But do remember to uncomment it after you're done debugging or the routing will stop.
  next()
})
export default router
