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
            <el-input size="small" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属人" label-width="120px" prop="user_id" :rules="rules.user_id" :error="error.user_id">
              <el-select size="small" v-model="form.user_id" placeholder="请分配用户" class="wl-add-space__option">
                  <el-option v-for="user in users" :key="user.id" :label="user.username" :value="user.id"></el-option>
              </el-select>
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
import {getUsers} from '@/services/user.service'
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
      users: [],
      error: this.initError(),
      form: this.initForm(),
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        user_id: [
          { required: true, message: '请选择用户角色', trigger: 'blur' }
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
            ...this.initForm(0)
          })
          this.getUsers({}, {
            target: '.wl-add-space__option'
          })
        }
      }
    },
    space (val) {
      if (this.visible) {
        if (val) {
          let {name, user_id} = val // eslint-disable-line
          this.form.name = name
          this.form.user_id = user_id // eslint-disable-line
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
    async getUsers () {
      let {data: {list}} = await getUsers()
      this.users = list
    },
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
        user_id: null
      }
    },
    initError () {
      return {
        name: '',
        user_id: ''
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
}
</style>
