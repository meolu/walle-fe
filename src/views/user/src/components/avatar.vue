<template>
  <div class="wl-avatar">
    <span v-if="avatar" class="icon">
      <img :src="avatar">
    </span>
    <span>{{ name }}</span>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    avatar: String
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(avatar) {
  display: flex;
  align-items: center;

  .icon {
    margin-right: 10px;
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    display: block;
  }
}
</style>
