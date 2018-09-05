<template>
  <el-scrollbar class="wl-sidebar" :class="{'is-collapse': isCollapse}">
    <el-menu
      :default-active="selected"
      background-color="#001529"
      :unique-opened="true"
      :collapse="isCollapse"
      @select="select" >
      <el-submenu v-if="item.child"  :index="'m' + index" v-for="(item, index) in menus" :key="'menu' + index" popper-class="wl-sidebar__submenu">
        <template slot="title"><i class="wl-sidebar-icon" v-if="item.icon" :class="[item.icon]"></i>
        <span slot="title">{{ item.text }}</span>
        </template>
        <el-menu-item  v-for="(child, cIndex) in item.child"
          :index="child.url || 'child' + index + '-' + cIndex"
          :key="'wlCMenu' + index + '-' + cIndex">
            <span slot="title">{{ child.text }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.url || 'm' + index">
        <i class="wl-sidebar-icon" v-if="item.icon" :class="[item.icon]"></i>
        <span slot="title">{{ item.text }}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>
<script>
import menu from '@/data/menu.json'
export default {
  name: 'wl-sidebar',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menus: menu,
      selected: 'm0'
    }
  },
  created () {
    this.initSelected(this.$route)
  },
  methods: {
    select (index) {
      this.selected = index
      this.$router.push(index)
    },
    // 初始化选中状态
    initSelected (to) {
      let {meta, path} = to
      if (meta && meta.isMenu) {
        this.selected = path
      }
    }
  },
  watch: {
    $route (to) {
      this.initSelected(to)
    }
  }
}
</script>
<style lang="scss">
@import 'scss';

$item-color: rgba(255, 255, 255, 0.8);

%icon {
  i.wl-sidebar-icon {
    color: #fff;
  }
}

%item {
    height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: $item-color;

      &:hover,
      &:focus {
        outline: none;
        color: #fff;
        // background-color: $primary !important;

        i {
          color: #fff;
        }
      }

      span {
        padding-left: 10px;
      }

      // 选中状态
      &.is-active {
        background-color: $primary !important;
        color: #fff;
        position: relative;

        @extend %icon;

        &::after {
          content: "";
          height: 100%;
          width: 4px;
          position: absolute;
          top: 0;
          left: 0;
          background-color: $primary;
        }
      }
}

@include b(sidebar) {
  height: 100%;
  min-width: $side-bar-width;
  background-color: #001529;
  z-index: 102;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: min-width 0.2s ease-in;

  @include when(collapse){
    min-width: 64px;
  }

  @include e(submenu) {
    .el-menu-item,
    .el-submenu__title {
       @extend %item;
    }
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-menu {
    border: 0;

    .el-menu-item,
    .el-submenu__title {
        @extend %item;
    }

    .el-submenu {

      &:hover,
      &:focus {
        .el-submenu__title,
        .el-submenu__title i {
            color: $item-color;
        }
      }
      // 打开子菜单
      &.is-active {
        .el-submenu__title {
          color: $primary;
        }

        @extend %icon;
      }
    }
  }
}

@include b(sidebar-icon) {
  margin-right: 10px;
  font-size: 14px;
}
</style>
