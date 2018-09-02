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
        <el-dropdown class="user-info">
          <span>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png">
            陈凤娟
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="wl-icon-user"></i> &nbsp;&nbsp;个人中心</el-dropdown-item>
            <el-dropdown-item divided><i class="wl-icon-exit"></i> &nbsp;&nbsp;退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'wl-header',
  data () {
    return {
      user: '',
      isCollapse: false
    }
  },
  methods: {
    async logout () {
      this.$router.replace('/login')
      let arr = ['operatorId', 'token', 'userName']
      arr.forEach(key => {
        this.$cookie.set(key, null, {
          path: '/',
          expires: new Date(0)
        })
      })
      window.location.reload()
    },
    onReload () {
      window.location.reload()
    },
    onCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('toggle', this.isCollapse)
    }
  }
}
</script>
<style src="./header.scss" lang="scss"></style>
