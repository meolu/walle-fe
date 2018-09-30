<template>
    <div class="wl-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in data" :key="item.name" :to="{ path: item.to }">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
         <el-button v-if="isBackButton" type="primary" size="small" @click="back">返回</el-button>
    </div>
</template>

<script>
export default {
  name: 'wl-breadcrumb',
  props: {
    data: {
      type: Array,
      required: true
    },
    isBackButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back () {
      const len = this.data.length
      this.$router.push(this.data[len - 2].to)
    }
  }
}
</script>
<style lang="scss">
@import 'scss';

@include b(breadcrumb) {
    display: flex;
    margin-bottom: 10px;

    .el-breadcrumb {
        flex-grow: 1;
        line-height: 32px;
    }

    .el-breadcrumb__inner {
        font-size: 14px;
    }

    .el-button--small, .el-button--small.is-round {
        padding: 5px 15px;
    }
}
</style>
