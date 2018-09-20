<template>
    <div class="wl-fullscreen">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'wl-fullscreen',
  data () {
    return {
      id: 'aasss',
      isSupportFullScreen: this.supportFullScreen()
    }
  },
  methods: {
    toggle (value) {
      if (value === undefined) {
        // 如果已经是全屏状态，则退出
        if (this.getFullScreenStatus()) {
          this.exitFullscreen()
        } else {
          this.enterFullscreen()
        }
      } else {
        value ? this.enterFullscreen() : this.exitFullscreen()
      }
    },
    getFullScreenStatus () {
      if (document.fullscreen ||
        document.mozFullScreen ||
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.webkitIsFullScreen) {
        return true
      } else {
        return false
      }
    },
    supportFullScreen () {
      const doc = document.documentElement
      return ('requestFullscreen' in doc) ||
        ('mozRequestFullScreen' in doc && document.mozFullScreenEnabled) ||
        ('msRequestFullscreen' in doc && document.msFullscreenEnabled) ||
        ('webkitRequestFullScreen' in doc)
    },
    enterFullscreen () {
      let element = this.$el
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    },
    exitFullscreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
  }
}
</script>
<style lang="scss">
@import 'scss';

@include b(fullscreen) {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}
</style>
