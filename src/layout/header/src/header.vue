<template>
  <header class="wl-header">
    <div class="logo" :class="{'is-collapse': isCollapse}">
      <img src='~assets/img/logo3.png'>
      <h1>&nbsp; Walle</h1>
    </div>
    <div class="tool">
      <i class="btn-collapse wl-icon-expend" @click="onCollapse"></i>
      <div class="user">
        <el-dropdown v-if="isSpace" class="user-info" @command="toggleSpace" trigger="click">
          <span>
            {{space.current.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="wl-header__space-menu">
            <el-dropdown-item
              :class="{'selected':item.id===space.current.id}"
              v-for="item in space.available"
              :key="item.id"
              :command="item">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="user-info" @command="command">
          <span>
            <img :src="user&&user.avatar||defaultIcon">
            <span v-if="user&&user.username">{{user.username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="self"><i class="wl-icon-user"></i> &nbsp;&nbsp;个人中心</el-dropdown-item>
            <!-- <el-dropdown-item command="about"><i class="wl-icon-about-walle"></i> &nbsp;&nbsp;关于瓦力</el-dropdown-item> -->
            <el-dropdown-item command="help"><i class="wl-icon-help"></i> &nbsp;&nbsp;帮助</el-dropdown-item>
            <el-dropdown-item divided command="logout"><i class="wl-icon-exit"></i> &nbsp;&nbsp;退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <self-dialog :visible.sync="visible"></self-dialog>
  </header>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import SelfDialog from './self.dialog.vue'
import {defaultIcon} from '@/config/global.config'
import {logout} from '@/services/user.service'
import {switchSpace} from '@/services/space.service'

export default {
  name: 'wl-header',
  components: {
    SelfDialog
  },
  data () {
    return {
      isCollapse: false,
      visible: false,
      defaultIcon
    }
  },
  computed: {
    ...mapGetters(['space', 'user']),
    isSpace () {
      return this.space && this.space.available && this.space.current
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: 'FETCH_USER_INFO'
    }),
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO'
    }),
    command (command) {
      this[command] && this[command]()
    },
    async logout () {
      await logout()
      this.setUserInfo()
      this.$router.replace('/login')
    },
    self () {
      this.visible = true
    },
    about () {
      window.open('/about', '_target')
    },
    onCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('toggle', this.isCollapse)
    },
    async toggleSpace (space) {
      if (this.space.current.id === space.id) return
      await switchSpace(space.id)
      this.$router.push('/')
      this.getUserInfo()
    },
    help () {
      window.open('http://walle-web.io', '_blank')
    },
    close (isLogout) {
      if (isLogout) {
        this.logout()
      }
    }
  }
}
</script>
<style src="./header.scss" lang="scss"></style>
