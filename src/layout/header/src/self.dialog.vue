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
            <el-tab-pane label="安全设置" name="password">安全设置</el-tab-pane>
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
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
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
        padding-right: 12px;
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
