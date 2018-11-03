<template>
  <div class="wl-layout">
    <wl-header @toggle="toggle"></wl-header>
    <wl-body>
      <wl-sidebar :isCollapse="isCollapse"></wl-sidebar>
      <wl-content>
        <router-view/>
      </wl-content>
    </wl-body>
  </div>
</template>

<script>
import wlBody from './body'
import wlHeader from './header'
import wlSidebar from './sidebar'
import wlContent from './content'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'layout',
  components: {wlBody, wlHeader, wlSidebar, wlContent},
  data () {
    return {
      isCollapse: false
    }
  },
  created () {
    if (!this.user) {
      this.getUserInfo()
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions({
      getUserInfo: 'FETCH_USER_INFO'
    }),
    toggle (isCollapse) {
      this.isCollapse = isCollapse
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

%content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

@include b(layout) {
  @extend %content;
}
</style>
