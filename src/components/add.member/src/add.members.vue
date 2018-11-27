<template>
    <el-card class="wl-add-member">
        <div class="wl-add-member__add-header">添加成员</div>
        <div class="wl-add-member__add-body">
            <el-form ref="form" :model="form" size="small" :rules="rules" label-width="80px">
                <el-form-item label="成员名称" prop="username" :error="error.username">
                    <select-user ref="selectUser" @select="handleFilterSelect" placeholder="搜索添加用户" :value="form.username"></select-user>
                </el-form-item>
                <el-form-item label="成员角色" prop="role_id">
                    <el-select size="small" v-model="form.role_id" placeholder="请分配角色" :style="{width: '400px'}">
                        <el-option v-for="(role, index) in roles" :key="index" :label="role" :value="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="wl-add-member__add-footer">
            <el-button type="primary" size="small" @click="addMember">添加</el-button>
        </div>
    </el-card>
</template>

<script>
import {ROLES_PROJECT} from '@/config/global.config'
import SelectUser from './select.user'
export default {
  name: 'add-member',
  components: {SelectUser},
  data () {
    return {
      form: {
        username: '',
        role_id: ''
      },
      rules: {
        role_id: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      },
      error: {
        username: ''
      },
      roles: ROLES_PROJECT
    }
  },
  methods: {
    handleFilterSelect (user) {
      Object.assign(this.form, {
        ...user
      })
    },
    addMember () {
      let isvalid = true
      if (!this.form.username) {
        this.error.username = '请选择用户名'
        isvalid = false
      }
      this.$refs.form.validate((valid) => {
        if (valid && isvalid) {
          let newMember = [{
            user_id: this.form.user_id,
            role: this.form.role_id
          }]
          this.$emit('add', newMember)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(add-member) {
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 0;
   display: flex;
   flex-direction: column;
   margin-bottom: 10px;
   text-align: left;

   .el-card__body {
      padding: 0;
   }

   @include e(add-header) {
       border-bottom: 1px solid #ebeef5;
       padding: 0 20px;
       background: #fafafa;
       color: #5c5c5c;
       font-size: 15px;
       line-height: 50px;
   }

   @include e(add-footer) {
       border-top: 1px solid #ebeef5;
       display: flex;
       justify-content: space-between;
       align-items: center;
       height: 50px;
       padding: 0 20px;
       background: #fafafa;
   }

   @include e(add-body) {
       padding: 20px;
   }

}
</style>
