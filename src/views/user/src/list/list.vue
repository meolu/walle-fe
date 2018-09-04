<template>
    <div class="wl-roles">
            <el-form :inline="true">
              <el-form-item>
                <el-input
                placeholder="请输入内容"
                size="small"
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
        <add-user-dialog :visible.sync="addUserDialogVisible"/>>
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
      form: {
        search: ''
      },
      currentEditUser: null,
      addUserDialogVisible: false
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
    edit (row, type) {
      if (type === 'save') {
        this.currentEditUser = null
      } else {
        this.currentEditUser = {
          ...row
        }
      }
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
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(roles) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;

   .el-input {
     width: 300px;
   }

   .el-table thead th {
     background-color: $--table-header-background;
   }

   .user-delete {
     color: #f56c6c;
   }
}
</style>
