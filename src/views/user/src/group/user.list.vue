<template>
    <div class="wl-group-users">
        <el-row :gutter="20" v-for="(row, i) in data" :key="i">
            <el-col :span="6" v-for="(user, col) in row" :key="user.id">
                <span class="item">
                    <img class="icon" :src="user.icon || defaultIcon"/>
                    <span class="wl-group-users__name">{{user.name}}</span>
                    <i class="wl-icon-delete close" @click="()=>{deleteUser(user, i, col)}"></i>
                </span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
const defaultIcon = 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
const group = function (array, subGroupLength) {
  let index = 0
  let newArray = []
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength))
  }

  return newArray
}

export default {
  props: {
    value: Array
  },
  data () {
    return {
      data: group(this.value, 4),
      defaultIcon: defaultIcon
    }
  },
  watch: {
    value (val) {
      this.data = group(val, 4)
    }
  },
  methods: {
    deleteUser (user, row, col) {
      this.value.splice((row * 4 + col), 1)
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(group-users) {
    @include e(user) {
        margin-right: 20px;
        margin-top: 20px;
    }

    @include e(name) {
        @include text-overflow-1;

        font-size: 14px;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .icon {
        width: 36px;
        height: 36px;
        border-radius: 36px;
        padding-right: 12px;
    }

    .item {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        height: 44px;
        padding: 3px 0 3px 5px;
        box-sizing: border-box;

        &:hover {
            border: 1px dashed #eee;

            .close {
                display: block;
            }
        }
    }

    .close {
        position: absolute;
        top: -7px;
        right: -7px;
        color: #F56C6C;
        display: none;
    }
}
</style>
