<template>
    <el-dialog
        class="wl-self"
        width = "600px"
        title = "个人设置"
        :visible="visible"
        :before-close="onCancel"
        :append-to-body="true">
        <el-tabs v-model="activeName" tab-position="left">
            <el-tab-pane label="基本设置" name="info">
                <div class="wl-self__info">
                    <el-form ref="form" :model="info" label-position="top">
                        <el-form-item label="Avatar">
                            <span class="item">
                                <img class="icon" :src="info.avatar || defaultIcon"/>
                            </span>
                            <el-upload
                                class="avatar-uploader"
                                name="avatar"
                                :action="uploadSrc"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="昵称" prop="username" :rules="rules.username">
                            <el-input v-model="info.username"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email" :rules="rules.email">
                            <el-input v-model="info.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" @click="save">更新基本信息</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="安全设置" name="password">
              <div class="wl-self__info">
              <el-form ref="passwordForm" :model="passwordForm" label-position="top">
                  <el-form-item label="重置密码" prop="password1" :rules="rules.password1">
                      <el-input type="password" v-model="passwordForm.password1"></el-input>
                  </el-form-item>
                  <el-form-item label="再输入密码" prop="password2" :rules="rules.password2">
                      <el-input type="password" v-model="passwordForm.password2"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button size="small" type="primary" @click="savePassword">重置密码</el-button>
                  </el-form-item>
              </el-form>
              </div>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {updateUser} from '@/services/user.service'
import {defaultIcon} from '@/config/global.config'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeName: 'info',
      defaultIcon: defaultIcon,
      info: {
        username: '',
        email: '',
        avatar: ''
      },
      passwordForm: {
        password1: '',
        password2: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请输入新的密码', trigger: 'blur' },
          { pattern: /(?=\d{0,}[a-zA-Z])(?=[a-zA-Z]{0,}\d)[a-zA-Z0-9]{6,}/, message: '密码强度不足', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: this.ValidatePassword, message: '再次输入的密码不一致', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    uploadSrc () {
      if (this.user) {
        return `http://${location.host}/api/user/${this.user.id}/avatar`
      } else {
        return ''
      }
    }
  },
  watch: {
    user: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val) this.info = {...val}
      }
    }
  },
  methods: {
    ...mapActions({
      getUser: 'FETCH_USER_INFO'
    }),
    onCancel () {
      this.$emit('update:visible')
      this.$emit('close')
    },
    async save () {
      await updateUser(this.user.id, {
        username: this.info.username,
        email: this.info.email,
        avatar: this.info.avatar
      })
      this.getUser()
      this.onCancel()
    },
    savePassword () {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          this.sendData()
        } else {
          return false
        }
      })
    },
    async sendData () {
      await updateUser(this.user.id, {
        password: this.passwordForm.password1
      })
      this.onCancel()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess (res, file) {
      this.info.avatar = res.data.avatar
    },
    ValidatePassword  (rule, value, callback) {
      if (this.passwordForm.password1 !== value) {
        callback(new Error('再次输入的密码不一致'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(self) {
    @include e(info) {
        width: 350px;
    }

    .icon {
        width: 70px;
        height: 70px;
        border-radius: 36px;
        margin-right: 12px;
    }

    .item {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        padding: 3px 0 3px 5px;
        box-sizing: border-box;
    }
}
</style>
