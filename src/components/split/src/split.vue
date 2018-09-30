<template>
    <div class="wl-split">
        {{title}}
    </div>
</template>

<script>
export default {
  name: 'wl-split',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(split) {
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 30px;
    font-size: 14px;
    border-bottom: 1px solid $border-color;
}

</style>
