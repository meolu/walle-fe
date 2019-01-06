<template>
    <div class="wl-login" id="wl-login">
        <div class="wl-login__content">
            <h2 class="wl-login__title">瓦力</h2>
            <el-form ref="form" :model="form">
                <el-form-item prop="email" :rules="rules.email">
                    <el-input v-model="form.email" auto-complete="off" placeholder="请输入邮箱" prefix-icon="wl-icon-email"></el-input>
                </el-form-item>
                <el-form-item prop="password" :rules="rules.password">
                    <input type="password" class="wl-login__pwd" autocomplete="new-password"/>
                    <el-input
                        v-model="form.password"
                        auto-complete="off"
                        type="password"
                        placeholder="请输入密码"
                        prefix-icon="wl-icon-password"
                        @keypress.native="keypress"></el-input>
                </el-form-item>
                <el-form-item>
                     <el-button type="primary" @click="login">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {login} from '@/services/user.service'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sendData()
        } else {
          return false
        }
      })
    },
    async sendData () {
      await login(this.form)
      this.$router.push('/')
    },
    keypress (e) {
      if (e.code === 'Enter') {
        this.login()
      }
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(login) {
    height: 100%;
    width: 100%;
    background: url('~assets/img/login.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-input--prefix .el-input__inner {
        background: transparent;
        color: #fff;
        border: rgba(255,255,255,0.3) 2px solid !important;
        border-radius: 50px;
    }

    .el-input__icon {
        color: #fff;
        font-size: 16px;
    }

    .el-input__inner {
        &::-webkit-input-placeholder {
            color: #eee;
        }
    }

    .el-button {
        width: 100%;
        border-radius: 50px;

        span {
            font-size: 18px;
            line-height: 20px;
        }
    }

    @include e(pwd) {
        display: none;
    }

    @include e(title) {
        margin-bottom: 20px;
        color: #fff;
        text-align: center;
        font-size: 20px;
    }

    @include e(content) {
        width: 300px;
        margin-top: -120px;
    }
}

</style>
