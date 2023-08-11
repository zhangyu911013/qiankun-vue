
// /**
//  * 
//  * @param {vuex实例} store 
//  * @param {qiankun下发的props} props 
//  */
import { defineStore } from 'pinia'

function registerGlobalModule(store, props = {}) {
  // Get initial state
  const initState = props.getGlobalState && props.getGlobalState() || {
    menu: [],
    user: {}
  }

  const useGlobalStore = defineStore({
    id: 'global',
    state: () => (initState),
    actions: {
      // Change state in child app and notify parent app
      setGlobalState(payload) {
        this.$patch(payload)
        this.emitGlobalState()
      },
      // Initialization, only used for synchronization with parent app data during mount
      initGlobalState(payload) {
        this.$patch(payload)
      },
      emitGlobalState() {
        if (props.setGlobalState) {
          props.setGlobalState(this.$state)
        }
      },
    },
  })

  // Each time when mount, synchronize parent app data
  const globalStore = useGlobalStore()
  globalStore.initGlobalState(initState)
  
  return globalStore
}

export default registerGlobalModule