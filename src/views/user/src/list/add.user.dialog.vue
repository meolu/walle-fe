<template>
    <el-dialog
        class="wl-add-user"
        width = "600px"
        :title = "isNew ? '新增用户' : '编辑用户'"
        :visible="visible"
        :before-close="onCancel"
        :append-to-body="true">
        <el-form :model="form" ref="form">
          <el-form-item label="用户名" label-width="120px" prop="username" :rules="rules.username" :error="error.username">
            <el-input size="small" v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="120px" prop="email" :rules="isNew ? rules.email : []"  :error="error.email">
                <el-input size="small" v-model="form.email" auto-complete="off" :disabled="!isNew"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="120px" prop="password" :rules="isNew ? rules.password : updatePasswordRules" :error="error.password">
            <el-input size="small" v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="onOk">确定</el-button>
          <el-button size="small" @click="onCancel">取消</el-button>
        </div>
      </el-dialog>
</template>

<script>
import {addUser, updateUser} from '@/services/user.service'
import {ROLES} from '@/config/global.config'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    user: Object // 用户信息
  },
  data () {
    return {
      roles: ROLES,
      error: this.initError(),
      form: this.initForm(0),
      updatePasswordRules: [{ pattern: /(?=\d{0,}[a-zA-Z])(?=[a-zA-Z]{0,}\d)[a-zA-Z0-9]{6,}/, message: '密码强度不足', trigger: 'blur' }],
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请设置密码', trigger: 'blur' },
          { pattern: /(?=\d{0,}[a-zA-Z])(?=[a-zA-Z]{0,}\d)[a-zA-Z0-9]{6,}/, message: '密码强度不足', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (val) {
        if (val) {
          if (this.user) {
            let {username, email, password} = this.user
            this.form.username = username
            this.form.email = email
            this.form.password = password
          } else {
            this.form = this.initForm()
          }
          this.$nextTick(() => {
            this.$refs.form && this.$refs.form.clearValidate()
          })
        }
      }
    }
  },
  computed: {
    isNew () {
      return !this.user
    }
  },
  methods: {
    onOk () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sendData()
        } else {
          return false
        }
      })
    },
    onCancel () {
      this.$emit('update:visible')
      this.$emit('close')
    },
    initForm () {
      return {
        email: '',
        password: '',
        username: ''
      }
    },
    initError () {
      return {
        email: '',
        password: '',
        username: ''
      }
    },
    async sendData () {
      try {
        this.error = this.initError()
        this.isNew && await addUser(this.form)
        this.isNew || await updateUser(this.user.id, this.form)
        this.$emit('update:visible')
        this.$emit('confirm')
      } catch ({code, message}) {
        if (message) {
          for (let key in message) {
            this.error[key] = message[key][0]
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(add-user) {
    .el-dialog__header {
        background: #fff;
        border-bottom: 1px solid #e8e8e8;
        border-radius: 4px 4px 0 0;
        color: rgba(0,0,0,.65);
        padding: 16px 24px;
    }

    .el-dialog__body {
        padding-right: 100px;
    }

    .el-dialog__footer {
        border-radius: 0 0 4px 4px;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
    }
}
</style>
