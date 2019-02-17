<template>
    <div class="wl-login" id="wl-login">
        <ul class="wl-login__bg-bubbles">
            <li>walle</li>
            <li>walle</li>
            <li>walle</li>
            <li>walle</li>
            <li>walle</li>
            <li>walle</li>
            <li>walle</li>
            <li>walle</li>
            <li>walle</li>
            <li>walle</li>
        </ul>
        <div class="wl-login__content">
            <h2 class="wl-login__title">walle 瓦力</h2>
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
    background: linear-gradient(to bottom right, #097ef3, #71adeb);
    display: flex;
    justify-content: center;
    align-items: center;

    .el-input--prefix .el-input__inner {
        background: transparent;
        color: #fff;
        border: rgba(255,255,255,0.3) 2px solid !important;
        // border-radius: 50px;
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
        background-color: #fff;
        color: #409EFF;
        // border-radius: 50px;

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
        font-size: 40px;
        font-weight: 300;
    }

    @include e(content) {
        width: 300px;
        margin-top: -120px;
    }

    @include e(bg-bubbles) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        li {
            position: absolute;
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            color: #fff;
            font-size: 24px;
            background-color: rgba(255, 255, 255, 0) !important;
            bottom: -160px;
            padding: 10px;
            animation: square 25s infinite;
            transition-timing-function: linear;

            &:nth-child(1) {
                left: 10%;
            }

            &:nth-child(2) {
                left: 20%;
                width: 80px;
                height: 80px;
                font-size: 48px;
                animation-delay: 2s;
                animation-duration: 17s;
            }

            &:nth-child(3) {
                left: 25%;
                animation-delay: 4s;
            }

            &:nth-child(4) {
                left: 40%;
                width: 60px;
                height: 60px;
                font-size: 36px;
                animation-duration: 22s;
                background-color: rgba(255, 255, 255, 0.25);
            }

            &:nth-child(5) {
                left: 70%;
            }

            &:nth-child(6) {
                left: 80%;
                width: 120px;
                height: 120px;
                font-size: 72px;
                animation-delay: 3s;
                background-color: rgba(255, 255, 255, 0.2);
            }

            &:nth-child(7) {
                left: 32%;
                width: 160px;
                height: 160px;
                font-size: 96px;
                animation-delay: 7s;
            }

            &:nth-child(8) {
                left: 55%;
                width: 20px;
                height: 20px;
                font-size: 16px;
                animation-delay: 15s;
                animation-duration: 40s;
            }

            &:nth-child(9) {
                left: 25%;
                width: 10px;
                height: 10px;
                font-size: 12px;
                animation-delay: 2s;
                animation-duration: 40s;
                background-color: rgba(255, 255, 255, 0.3);
            }

            &:nth-child(10) {
                left: 90%;
                width: 160px;
                height: 160px;
                font-size: 96px;
                animation-delay: 11s;
            }
        }

        @keyframes square {
            0% {
                -webkit-transform: translateY(0);
                        transform: translateY(0);
            }
            100% {
                -webkit-transform: translateY(-1600px) rotate(600deg);
                        transform: translateY(-1600px) rotate(600deg);
            }
        }
    }
}

</style>
