import { defineStore } from 'pinia'
import Vue from 'vue'

// Define the empty store
let useGlobalUserStore = defineStore({
  id: 'globalUser',
  state: () => ({}),
  getters: {},
  actions: {}
})

export {
  useGlobalUserStore
}

// Function to register a new store
export function registerStore (store) {
  useGlobalUserStore = store
}
