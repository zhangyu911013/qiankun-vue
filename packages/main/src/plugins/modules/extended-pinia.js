import { defineStore } from 'pinia'

const originalDefineStore = defineStore

function extendedDefineStore (options) {
  const subscriptionManager = {
    subscriptions: {},

    add (store, id, unsubscribeFunction) {
      if (!this.subscriptions[store.$id]) {
        this.subscriptions[store.$id] = {}
      }
      this.subscriptions[store.$id][id] = unsubscribeFunction
    },

    remove (store, id) {
      if (this.subscriptions[store.$id] && this.subscriptions[store.$id][id]) {
        this.subscriptions[store.$id][id]()
        delete this.subscriptions[store.$id][id]
      }
    },

    has (store, id) {
      return !!(
        this.subscriptions[store.$id] && this.subscriptions[store.$id][id]
      )
    }
  }
  const originalStore = originalDefineStore(options)

  return function useExtendedStore () {
    const storeInstance = originalStore()

    // Extend with $subscribeById
    storeInstance.$subscribeById = function (callback, id) {
      if (!subscriptionManager.has(storeInstance, id)) {
        const unsubscribe = storeInstance.$subscribe(callback)
        subscriptionManager.add(storeInstance, id, unsubscribe)
      }
    }

    // Extend with $unsubscribeById
    storeInstance.$unsubscribeById = function (id) {
      console.log('subscriptionManager', subscriptionManager.subscriptions)
      subscriptionManager.remove(storeInstance, id)
    }

    return storeInstance
  }
}

export { extendedDefineStore }
