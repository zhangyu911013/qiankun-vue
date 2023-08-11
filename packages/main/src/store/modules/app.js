import { defineStore } from 'pinia'
import { extendedDefineStore } from '@/plugins/modules/extended-pinia'

export const useAppStore = extendedDefineStore({
  id: 'useAppStore',
  state: () => ({
    appState: {
      isLoadingMicro: false
    },
    uiState: {
      collapsed: false
    }

  }),
  getters: {
    /** 获取侧边栏状态 */
    getCollapsed: (state) => {
      return state.uiState.collapsed
    }
  },

  actions: {
    /** 侧边栏触发事件 */
    toggleCollapsed () {
      this.uiState.collapsed = !this.uiState.collapsed
    },
    setLoadingMicro (isLoadingMicro) {
      this.appState.isLoadingMicro = isLoadingMicro
    }
  }
})
