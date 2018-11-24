<template>
    <div class="wl-group-edit">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <el-form :inline="true" class="wl-group-edit__header" @submit.native.prevent>
             <el-form-item label="用户组">
                <el-input
                placeholder="请输入用户组名称"
                size="small"
                v-model="name"/>
            </el-form-item>
            <select-user @select="handleFilterSelect" :groupUserList="groupUserList"></select-user>
        </el-form>
        <div class="wl-group-edit__list">
            <div class="wl-group-edit__placeholder" v-if="groupUserList.length===0">请添加用户</div>
            <user-list v-else :value="groupUserList" @input="input"></user-list>
        </div>
        <el-form :inline="true" class="submit-form">
            <el-form-item>
               <el-button type="primary" size="small" @click="submit">submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import UserList from './user.list.vue'
import SelectUser from './select.user.vue'
import {getGroup, addGroup, updateGroup} from '@/services/group.service'
export default {
  components: {UserList, SelectUser},
  props: {
    id: String
  },
  created () {
    if (this.id) {
      this.getGroupInfo()
    }
  },
  computed: {
    isNew () {
      return this.id === undefined
    }
  },
  data () {
    return {
      name: '',
      groupUserList: [],
      search: '',
      breadcrumbData: [
        {
          to: '/user/groups',
          name: '用户组'
        },
        {
          to: '',
          name: this.id ? '编辑' : '创建'
        }
      ]
    }
  },
  methods: {
    input (args) {
      this.groupUserList = args
    },
    async getGroupInfo () {
      let {data:{group_name, members}} = await getGroup(this.id) // eslint-disable-line
      this.name = group_name // eslint-disable-line
      this.groupUserList = members // eslint-disable-line
    },
    handleFilterSelect (user) {
      this.groupUserList.push(user)
    },
    requestForm () {
      return {
        group_name: this.name,
        // uid_roles: JSON.stringify(this.groupUserList.map(user => { return {user_id: user.id, role: 'developer'} }))
        user_ids: this.groupUserList.map(user => user.id).join(',')
      }
    },
    async submit () {
      if (!this.name) {
        this.$message.error('请输入用户组名称')
        return null
      }
      if (this.groupUserList.length === 0) {
        this.$message.error('请添加用户')
        return null
      }
      if (this.isNew) {
        await addGroup(this.requestForm())
      } else {
        await updateGroup(this.id, this.requestForm())
      }
      this.$message({
        type: 'success',
        message: this.isNew ? '添加成功' : '修改成功'
      })
      this.$router.push('/user/groups')
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(group-edit) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;
   display: flex;
   flex-direction: column;

   .el-input {
     width: 300px;
   }

   .el-table {
      margin-top: 0 !important;
      margin-bottom: 20px;
   }

   .submit-form {
       text-align: right;
   }

   .el-form--inline .el-form-item {
       margin-right: 0;
   }

   @include e(header) {
      display: flex;
      justify-content: space-between;
   }

   @include e(list) {
       flex-grow: 1;
   }

   @include e(placeholder) {
       text-align: center;
       font-size: 24px;
       margin-top: 100px;
       color: #eee;
   }
}
</style>
