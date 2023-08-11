import { menuConfig } from '@/configs'

export default {
  data () {
    return {
      menuItems: menuConfig
    }
  },
  methods: {
    redirectTo (link) {
      history.pushState(null, null, link)
      // this.$router.push(link)
    }
  }
}
