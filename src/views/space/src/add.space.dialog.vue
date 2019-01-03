<template>
    <el-dialog
        class="wl-add-space"
        width = "600px"
        :title = "isNew ? '新增空间' : '编辑空间'"
        :visible="visible"
        :close-on-click-modal="false"
        :before-close="onCancel"
        :append-to-body="true">
        <el-form :model="form" ref="form">
          <el-form-item label="空间名称" label-width="120px" prop="name" :rules="rules.name" :error="error.name">
            <el-input size="small" v-model="form.name" auto-complete="off" placeholder="空间名称"></el-input>
            </el-form-item>
            <el-form-item v-if="visible" label="所属人" label-width="120px" prop="user_id" :error="error.user_id">
              <search-user @select="handleFilterSelect" @search="search" placeholder="请分配用户" :value="form.user_name"></search-user>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="onOk">确定</el-button>
          <el-button size="small" @click="onCancel">取消</el-button>
        </div>
      </el-dialog>
</template>

<script>
import {addSpace, updateSpace} from '@/services/space.service'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    space: Object // 用户信息
  },
  data () {
    return {
      error: this.initError(),
      form: this.initForm(),
      rules: {
        name: [
          { required: true, message: '请输入空间名称', trigger: 'blur' }
        ],
        user_id: [
          { required: true, message: '请分配用户', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (val) {
        if (val) {
          Object.assign(this.form, {
            ...this.initForm()
          })
          if (this.space) this.refreshForm()
        }
      }
    },
    space (val) {
      if (this.visible) {
        if (val) {
          this.refreshForm()
        } else {
          this.form = this.initForm()
        }
      }
    }
  },
  computed: {
    isNew () {
      return !this.space
    }
  },
  methods: {
    refreshForm () {
      let {name, user_id, user_name} = this.space // eslint-disable-line
      this.form.name = name
      this.form.user_id = user_id // eslint-disable-line
      this.form.user_name = user_name // eslint-disable-line
    },
    onOk () {
      let flag = this.check()
      this.$refs.form.validate((valid) => {
        if (valid && flag) {
          this.sendData()
        } else {
          return false
        }
      })
    },
    check () {
      if (this.form.user_id) {
        return true
      } else {
        this.error.user_id = '请分配用户'
        return false
      }
    },
    onCancel () {
      this.$emit('update:visible')
      this.$emit('close')
    },
    initForm () {
      return {
        name: '',
        user_id: null,
        user_name: ''
      }
    },
    initError () {
      return {
        name: '',
        user_id: '',
        user_name: ''
      }
    },
    async sendData () {
      try {
        this.error = this.initError()
        this.isNew && await addSpace(this.form)
        this.isNew || await updateSpace(this.space.id, this.form)
        this.$emit('update:visible')
        this.$emit('confirm')
      } catch ({code, message}) {
        if (message) {
          for (let key in message) {
            this.error[key] = message[key][0]
          }
        }
      }
    },
    handleFilterSelect (user) {
      this.form.user_id = user.user_id
      this.form.user_name = user.username
    },
    search (val) {
      this.form.user_id = null
      if (!val) this.error.user_id = '请分配用户'
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(add-space) {
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

    .el-autocomplete {
      width: 360px;
    }
}
</style>
