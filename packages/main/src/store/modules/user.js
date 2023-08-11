import { defineStore } from 'pinia'
import { extendedDefineStore } from '@/plugins/modules/extended-pinia'

export const useUserStore = extendedDefineStore({
  id: 'useUserStore',
  state: () => ({
    token: 'asdasd'
  }),
  getters: {
    getToken () {
      return this.token || ''
    }
  },
  actions: {
    setToken (payload) {
      console.log('set Token', payload)
      this.token = payload
    }
  }
})
