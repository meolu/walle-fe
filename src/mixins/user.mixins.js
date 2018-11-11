import {mapGetters, mapActions} from 'vuex'
export default {
  async created () {
    if (!this.user) {
      await this.getUserInfo()
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions({
      getUserInfo: 'FETCH_USER_INFO'
    })
  }
}
