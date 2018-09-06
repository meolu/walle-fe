<template>
    <div class="wl-user-list">
            <el-form :inline="true">
              <el-form-item>
                <el-input
                placeholder="请输入内容"
                size="small"
                class="search"
                v-model="value">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="addRole">添加</el-button>
              </el-form-item>
            </el-form>
        <wl-table
            ref="table"
            :columns="columns"
            :pageSize="15"
            @callServe="callServe"></wl-table>
        <add-user-dialog :visible.sync="addUserDialogVisible" :user="currentEditUser" @confirm="confirm" @close="close"/>
    </div>
</template>

<script>
import COLUMNS from './columns'
import {userlist} from '../test'
import addUserDialog from './add.user.dialog.vue'
export default {
  name: 'user-list',
  components: {
    addUserDialog
  },
  data () {
    return {
      value: '',
      columns: COLUMNS.call(this),
      currentEditUser: null,
      addUserDialogVisible: false,
      roles: [{
        id: 0,
        name: '管理员'
      },
      {
        id: 1,
        name: '开发者'
      }]
    }
  },
  methods: {
    callServe (table = this.$refs.table) {
      table.page = {
        total: 100,
        size: 15,
        currentPage: 1
      }
      table.list = userlist
    },
    addRole () {
      this.addUserDialogVisible = true
    },
    edit (row) {
      this.addUserDialogVisible = true
      this.currentEditUser = {
        ...row
      }
    },
    lock (row) {

    },
    delete (row) {
      this.$confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    confirm (user) {
      this.currentEditUser = null
    },

    close () {
      this.currentEditUser = null
    },

    renderTools (scope) {
      return (
        <div>
          <el-button type="text" size="small" icon="el-icon-edit" onClick={() => this.edit({...scope.row})}>编辑</el-button>
          <el-button type="text" class="user-delete" size="small" icon="el-icon-delete" onClick={() => this.delete({...scope.row})}>删除</el-button>
          <el-button type="text" size="small" icon="wl-icon-lock" onClick={() => this.lock({...scope.row})}>冻结</el-button>
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
}
</style>
