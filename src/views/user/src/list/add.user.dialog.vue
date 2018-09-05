<template>
    <el-dialog
        class="wl-add-user"
        width = "600px"
        title = "新增用户"
        :visible.sync="visible"
        :append-to-body=true>
        <el-form :model="form" ref="form">
            <el-form-item label="邮箱" label-width="120px" prop="email" :rules="rules.email">
                <el-input size="small" v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="120px" prop="password" :rules="rules.password">
            <el-input size="small" v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" label-width="120px" prop="realname" :rules="rules.realname">
            <el-input size="small" v-model="form.realname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" label-width="120px" prop="role" :rules="rules.role">
              <el-select size="small" v-model="form.role" placeholder="请分配角色">
                  <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id"></el-option>
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
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      roles: [{
        id: 0,
        name: '管理员'
      },
      {
        id: 1,
        name: '开发者'
      }],
      form: {
        email: '',
        password: '',
        realname: '',
        role: null
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请设置密码', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入用户真实姓名', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择用户角色', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onOk () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('update:visible')
        } else {
          return false
        }
      })
    },
    onCancel () {
      this.$emit('update:visible')
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
