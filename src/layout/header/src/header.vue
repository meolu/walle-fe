<template>
  <header class="wl-header">
    <!-- 消息模板 -->
    <!-- <el-popover
      ref="poperMsg"
      placement="bottom"
      width="200"
      trigger="click">
      <h1>我是消息模板</h1>
    </el-popover> -->
    <div class="logo" :class="{'is-collapse': isCollapse}">
      <img src='~assets/img/logo.png'>
      <h1>&nbsp; Walle</h1>
    </div>
    <div class="tool">
      <i class="btn-collapse wl-icon-expend" @click="onCollapse"></i>
      <div class="user">
        <!-- <div class="wl-header__btns">
          <span class="btn" v-popover:poperMsg>
            <el-badge :value="10" :max="99">
              <i class="wl-icon-msg"></i>
            </el-badge>
          </span>
        </div> -->
        <el-dropdown class="user-info" @command="command">
          <span>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png">
            陈凤娟
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="self"><i class="wl-icon-user"></i> &nbsp;&nbsp;个人中心</el-dropdown-item>
            <el-dropdown-item divided command="logout"><i class="wl-icon-exit"></i> &nbsp;&nbsp;退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <self-dialog :visible.sync="visible"></self-dialog>
  </header>
</template>
<script>
// import {logout} from '@/services/user.service'
import SelfDialog from './self.dialog.vue'
export default {
  name: 'wl-header',
  components: {
    SelfDialog
  },
  data () {
    return {
      user: '',
      isCollapse: false,
      visible: false
    }
  },
  methods: {
    command (command) {
      this[command] && this[command]()
    },
    logout () {
      // await logout()
      this.$router.replace('/login')
    },
    self () {
      this.visible = true
    },
    onCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('toggle', this.isCollapse)
    }
  }
}
</script>
<style src="./header.scss" lang="scss"></style>
