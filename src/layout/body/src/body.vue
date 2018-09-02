<template>
  <div class="wl-body">
     <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'wl-body'
}
</script>
<style lang="scss">
@import 'scss';

.wl-body {
  position: absolute;
  width: 100%;
  top: $header-height;
  bottom: 0;
  background-color: $bg-color;
  z-index: 1000;
}
</style>
