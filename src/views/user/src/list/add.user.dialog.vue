<template>
    <el-dialog
        class="wl-add-user"
        width = "600px"
        title = "新增用户"
        :visible.sync="visible"
        :append-to-body=true>
        <el-form :model="form">
            <el-form-item label="邮箱" label-width="120px">
            <el-input size="small" v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="120px">
            <el-input size="small" v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" label-width="120px">
            <el-input size="small" v-model="form.realname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" label-width="120px">
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
        role: 1
      }
    }
  },
  methods: {
    onOk () {
      this.$emit('update:visible')
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

    .el-dialog__footer {
        border-radius: 0 0 4px 4px;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
    }
}
</style>
