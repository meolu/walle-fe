<template>
    <el-dialog
        class="wl-add-server"
        width = "600px"
        :title = "isNew ? '新增服务器' : '编辑服务器'"
        :visible="visible"
        :close-on-click-modal="false"
        :before-close="onCancel"
        :append-to-body="true">
        <el-form :model="form" ref="form">
          <el-form-item label="名称" label-width="120px" prop="name" :rules="rules.name" :error="error.name">
            <el-input size="small" v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="host" label-width="120px" prop="host" :rules="rules.host" :error="error.host">
            <el-input size="small" v-model="form.host" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="ssh user" label-width="120px" prop="user" :rules="rules.user" :error="error.user">
            <el-input size="small" v-model="form.user" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="ssh port" label-width="120px" prop="port" :rules="rules.port" :error="error.port">
            <el-input size="small" v-model="form.port" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="onOk">确定</el-button>
          <el-button size="small" @click="onCancel">取消</el-button>
        </div>
      </el-dialog>
</template>

<script>
import {addServer, updateServer, getServer} from '@/services/server.service'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    server: Object // 用户信息
  },
  data () {
    return {
      error: this.initError(),
      form: this.initForm(),
      rules: {
        name: [
          { required: true, message: '请输入服务器名称', trigger: 'blur' }
        ],
        host: [
          { required: true, message: '请输入服务器ip', trigger: 'blur' }
          // { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/, message: 'ip地址错误', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入user', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入port', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    async visible (val) {
      if (val) {
        if (this.server) {
          const {data: {host, name, port, user}} = await getServer(this.server.id)
          // let {host, name, port, user} = this.server
          this.form = {
            port: port || 22,
            user: user,
            name: name,
            host: host
          }
        } else {
          this.form = this.initForm()
        }
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate()
        })
      }
    }
  },
  computed: {
    isNew () {
      return !this.server
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
        name: '',
        host: '',
        port: 22,
        user: ''
      }
    },
    initError () {
      return {
        name: '',
        host: '',
        port: '',
        user: ''
      }
    },
    async sendData () {
      try {
        this.error = this.initError()
        this.isNew && await addServer(this.form)
        this.isNew || await updateServer(this.server.id, this.form)
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

@include b(add-server) {
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
