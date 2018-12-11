<template>
    <el-dialog
        class="wl-add-environment"
        width = "600px"
        :title = "isNew ? '新增环境' : '编辑环境'"
        :visible="visible"
        :close-on-click-modal="false"
        :before-close="onCancel"
        :append-to-body="true">
        <el-form :model="form" ref="form">
          <el-form-item label="名称" label-width="120px" prop="env_name" :rules="rules.env_name" :error="error.env_name">
            <el-input size="small" v-model="form.env_name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="onOk">确定</el-button>
          <el-button size="small" @click="onCancel">取消</el-button>
        </div>
      </el-dialog>
</template>

<script>
import {addEnvironment, updateEnvironment} from '@/services/environment.service'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    environment: Object // 用户信息
  },
  data () {
    return {
      error: this.initError(),
      form: this.initForm(),
      rules: {
        env_name: [
          { required: true, message: '请输入环境名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    environment (val) {
      if (val) {
          let {env_name: name} = val // eslint-disable-line
        this.form.env_name = name
      } else {
        this.form = this.initForm()
      }
    }
  },
  computed: {
    isNew () {
      return !this.environment
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
        env_name: ''
      }
    },
    initError () {
      return {
        env_name: ''
      }
    },
    async sendData () {
      try {
        this.error = this.initError()
        this.isNew && await addEnvironment(this.form)
        this.isNew || await updateEnvironment(this.environment.id, {
          ...this.form,
          status: this.environment.status
        })
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

@include b(add-environment) {
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
