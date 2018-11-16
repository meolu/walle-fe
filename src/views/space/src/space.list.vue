<template>
    <div class="wl-space-list">
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item>
                <el-input
                placeholder="请输入内容"
                size="small"
                class="search"
                v-model="value">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
              </el-form-item>
              <el-form-item v-if="enableCreate">
                <el-button type="primary" size="small" icon="el-icon-edit" @click="addSpace">添加</el-button>
              </el-form-item>
            </el-form>
        <wl-table
            ref="table"
            :columns="columns"
            @callServe="callServe"></wl-table>
        <add-space-dialog :visible.sync="addSpaceDialogVisible" :space="currentEditSpace" @confirm="confirm" @close="close"/>
    </div>
</template>

<script>
import COLUMNS from './columns'
import addSpaceDialog from './add.space.dialog.vue'
import {getSpaces, deleteSpace} from '@/services/space.service'
export default {
  name: 'space-list',
  components: {
    addSpaceDialog
  },
  data () {
    return {
      enableCreate: false,
      value: '',
      columns: COLUMNS.call(this),
      currentEditSpace: null,
      addSpaceDialogVisible: false
    }
  },
  watch: {
    value () {
      this.search()
    }
  },
  methods: {
    async callServe (table = this.$refs.table) {
      let {data: {list, count, enable_create}} = await getSpaces({ // eslint-disable-line
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
    addSpace () {
      this.addSpaceDialogVisible = true
    },
    edit (row) {
      this.addSpaceDialogVisible = true
      this.currentEditSpace = {
        ...row
      }
    },
    delete (row) {
      this.$confirm('确定删除该空间吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteSpace(row)
      }).catch(() => {})
    },

    async deleteSpace (row) {
      await deleteSpace(row.id)
      this.callServe()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },

    confirm (user) {
      this.currentEditSpace = null
      this.callServe()
    },

    close () {
      this.currentEditSpace = null
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

@include b(space-list) {
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
