import { defineStore } from 'pinia'
import Vue from 'vue'

let unsubscribe
// Define the empty store
export const useGlobalUserStore = defineStore({
  id: 'globalUser',
  state: () => ({}),
  getters: {},
  actions: {}
})

// Function to register a new store
export function registerStore (store) {
  const globalUserStore = useGlobalUserStore()
  const storeInstance = store()

  // Add state properties
  for (const prop in storeInstance.$state) {
    if (!(prop in globalUserStore.$state)) {
      // Use Vue.set() to ensure reactivity
      Vue.set(globalUserStore.$state, prop, storeInstance.$state[prop])

      // Define a getter and a setter for the property
      Object.defineProperty(globalUserStore, prop, {
        get: () => globalUserStore.$state[prop],
        set: (value) => {
          globalUserStore.$patch({ [prop]: value })
          storeInstance.$patch({ [prop]: value })
        },
        enumerable: true,
        configurable: true
      })
    }
  }

  // Subscribe to state changes in storeInstance and update globalUserStore
  unsubscribe = storeInstance.$subscribeById((mutation, state) => {
    // Apply the state change to globalUserStore
    originalGlobalPatch(state)
  }, 'sub-vue')

  // Proxy the $patch method of globalUserStore to also patch storeInstance
  const originalGlobalPatch = globalUserStore.$patch.bind(globalUserStore)
  globalUserStore.$patch = (patch) => {
    originalGlobalPatch(patch)
    storeInstance.$patch(patch)
  }

  // Add actions (excluding $-prefixed actions)
  for (const action in storeInstance) {
    if (
      typeof storeInstance[action] === 'function' &&
      !(action in globalUserStore) &&
      !action.startsWith('$')
    ) {
      globalUserStore[action] = (...args) => {
        const result = storeInstance[action](...args)
        // Sync the states after executing the action
        // globalUserStore.$patch(storeInstance.$state)
        return result
      }
    }
  }
}

export function unregisterStore () {
  console.log('unregisterStore', unregisterStore)
  const globalUserStore = useGlobalUserStore()
  if (unsubscribe) {
    unsubscribe() // This will remove the subscription
  }

  // Restore original $patch method
  globalUserStore.$patch = globalUserStore.$patch.bind(globalUserStore)
}
