<template>
    <div class="wl-environment">
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item>
                <el-input
                placeholder="请输入内容"
                size="small"
                class="search"
                @keyup.enter.native="search"
                v-model="value">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
              </el-form-item>
              <el-form-item v-if="enableCreate">
                <el-button type="primary" size="small" icon="el-icon-edit" @click="addEnvironment">添加</el-button>
              </el-form-item>
            </el-form>
        <wl-table
            ref="table"
            :columns="columns"
            @callServe="callServe"></wl-table>
        <add-environment-dialog :visible.sync="addEnvironmentDialogVisible" :environment="currentEditEnvironment" @confirm="confirm" @close="close"/>
    </div>
</template>

<script>
import COLUMNS from './columns'
import addEnvironmentDialog from './add.environment.dialog.vue'
import {getEnvironments, deleteEnvironment} from '@/services/environment.service'
export default {
  name: 'project-environment',
  components: {
    addEnvironmentDialog
  },
  data () {
    return {
      enableCreate: false,
      value: '',
      columns: COLUMNS.call(this),
      currentEditEnvironment: null,
      addEnvironmentDialogVisible: false
    }
  },
  methods: {
    async callServe (table = this.$refs.table) {
      let {data: {list, count, enable_create}} = await getEnvironments({ // eslint-disable-line
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
    addEnvironment () {
      this.addEnvironmentDialogVisible = true
      this.currentEditEnvironment = null
    },
    edit (row) {
      this.addEnvironmentDialogVisible = true
      this.currentEditEnvironment = {
        ...row
      }
    },
    delete (row) {
      this.$confirm('确定删除该环境吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletEenvironment(row)
      }).catch(() => {})
    },

    async deletEenvironment (row) {
      await deleteEnvironment(row.id)
      this.callServe()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },

    confirm (user) {
      this.currentEditEnvironment = null
      this.callServe()
    },

    close () {
      this.currentEditEnvironment = null
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

    renderTools (scope) {
      return (
        <div>
          {this.renderEditTool(scope.row)}
          {this.renderDeleteTool(scope.row)}
        </div>
      )
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(environment) {
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
