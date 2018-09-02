<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
%content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

html,
body {
  @extend %content;

  #app {
    @extend %content;
  }
}
</style>
