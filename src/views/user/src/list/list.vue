<template>
    <div class="wl-user-list">
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item>
                <!-- <el-input
                placeholder="请输入内容"
                size="small"
                class="search"
                v-model="value">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input> -->
              <select-user @select="handleFilterSelect" placeholder="搜索添加用户"></select-user>
              </el-form-item>
              <el-form-item v-if="enableCreate">
                <el-button type="primary" size="small" icon="el-icon-edit" @click="addUser">添加</el-button>
              </el-form-item>
            </el-form>
        <wl-table
            ref="table"
            :columns="columns"
            @callServe="callServe"></wl-table>
        <add-user-dialog :visible.sync="addUserDialogVisible" :user="currentEditUser" @confirm="confirm" @close="close"/>
    </div>
</template>

<script>
import COLUMNS from './columns'
import addUserDialog from './add.user.dialog.vue'
import {getUsers, deleteUser, blockUser, activeUser, addUser} from '@/services/user.service'
import SelectUser from '../components/select.user.vue'
export default {
  name: 'user-list',
  components: {
    addUserDialog,
    SelectUser
  },
  data () {
    return {
      enableCreate: false,
      value: '',
      columns: COLUMNS.call(this),
      currentEditUser: null,
      addUserDialogVisible: false
    }
  },
  watch: {
    value () {
      this.search()
    }
  },
  methods: {
    async callServe (table = this.$refs.table) {
      let {data: {list, count, enable_create}} = await getUsers({ // eslint-disable-line
        size: table.page.size,
        page: table.page.currentPage,
        kw: this.value
      })
      this.enableCreate = enable_create // eslint-disable-line
      table.page.total = count
      table.list = list
    },
    search () {
      this.callServe()
    },
    // 搜索出来的用户要添加进空间
    async handleFilterSelect ({email, username}) {
      await addUser({
        email: email,
        username: username
      })
      this.$message({
        type: 'success',
        message: '添加成功!'
      })
    },
    addUser () {
      this.addUserDialogVisible = true
    },
    edit (row) {
      this.addUserDialogVisible = true
      this.currentEditUser = {
        ...row
      }
    },
    async lock (row) {
      if (row.status === '正常') {
        await blockUser(row.id)
      } else if (row.status === 2) {
        await activeUser(row.id)
      }
      this.callServe()
    },
    delete (row) {
      this.$confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(row)
      }).catch(() => {})
    },

    async deleteUser (row) {
      await deleteUser(row.id)
      this.callServe()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },

    confirm (user) {
      this.currentEditUser = null
      this.callServe()
    },

    close () {
      this.currentEditUser = null
    },

    renderEditTool (row) {
      if (row.enable_update) {
        return <el-button type="text" size="small" icon="el-icon-edit" onClick={() => this.edit({...row})}>编辑</el-button>
      } else {
        return null
      }
    },

    renderDeleteTool (row) {
      if (row.enable_delete) {
        return <el-button type="text" class="user-delete" size="small" icon="el-icon-delete" onClick={() => this.delete({...row})}>删除</el-button>
      } else {
        return null
      }
    },

    renderBlockTool (row) {
      if (row.enable_block) {
        return <el-button type="text" size="small" icon="wl-icon-lock" onClick={() => this.lock({...row})}>{row.status === '正常' ? '冻结' : '激活'}</el-button>
      } else {
        return null
      }
    },

    renderTools (scope) {
      return (
        <div>
          {this.renderEditTool(scope.row)}
          {this.renderDeleteTool(scope.row)}
          {this.renderBlockTool(scope.row)}
        </div>
      )
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(user-list) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;

   .search {
     width: 300px;
   }

   .el-table thead th {
     background-color: $--table-header-background;
   }

   .user-delete {
     color: #f56c6c;
   }

   .el-button {
     i {
       font-size: 12px;
     }
   }

   .wl-search .el-input {
     margin-top: 2px;
   }

   .wl-search .el-input__suffix-inner {
     top: 0;
   }
}
</style>
