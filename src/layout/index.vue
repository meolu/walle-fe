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
import {mapGetters} from 'vuex'
import user from '@/mixins/user.mixins'

export default {
  name: 'layout',
  mixins: [user],
  components: {wlBody, wlHeader, wlSidebar, wlContent},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters(['user', 'space', 'spaceName'])
  },
  methods: {
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
