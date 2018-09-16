<template>
    <el-dialog
        class="wl-self"
        width = "600px"
        title = "个人设置"
        :visible="visible"
        :before-close="onCancel"
        :append-to-body="true">
        <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
            <el-tab-pane label="基本设置" name="info">
                <div class="wl-self__info">
                    <el-form ref="form" :model="info" label-position="top">
                        <el-form-item label="Avatar">
                            <span class="item">
                                <img class="icon" :src="info.avatar || defaultIcon"/>
                            </span>
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-form-item>
                        <el-form-item label="昵称" prop="username" :rules="rules.username">
                            <el-input v-model="info.username"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email" :rules="rules.email">
                            <el-input v-model="info.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary">更新基本信息</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="安全设置" name="password">安全设置</el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
const defaultIcon = 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
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
  methods: {
    onOk () {

    },
    onCancel () {
      this.$emit('update:visible')
      this.$emit('close')
    },
    handleClick () {

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
