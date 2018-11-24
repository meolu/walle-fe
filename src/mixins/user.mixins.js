import {mapActions} from 'vuex'
export default {
  async created () {
    if (!this.user) {
      await this.getUserInfo()
    }
  },
  // computed: {
  //   ...mapGetters(['user', 'space', 'spaceName'])
  // },
  methods: {
    ...mapActions({
      getUserInfo: 'FETCH_USER_INFO'
    })
  }
}
