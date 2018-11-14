<template>
    <div class="wl-project">
      <wl-breadcrumb :data="breadcrumbData" :isBackButton="false"></wl-breadcrumb>
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item>
                <el-input
                placeholder="请输入项目名称"
                size="small"
                @keyup.enter.native="search"
                v-model="value">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item v-if="enableCreate">
                <el-button type="primary" size="small" @click="addProject">新建项目</el-button>
              </el-form-item>
            </el-form>
        <wl-table
            ref="table"
            :columns="columns"
            @callServe="callServe"></wl-table>
    </div>
</template>

<script>
import COLUMNS from './columns'
import {getProjects, deleteProject} from '@/services/project.service'
import userMixins from '@/mixins/user.mixins'

export default {
  name: 'roles',
  mixins: [userMixins],
  data () {
    return {
      enableCreate: false,
      value: '',
      columns: COLUMNS.call(this),
      form: {
        search: ''
      },
      breadcrumbData: [
        {
          to: '',
          name: '项目'
        }
      ]
    }
  },
  methods: {
    async callServe (table = this.$refs.table) {
      let {data: {list, count, enable_create}} = await getProjects({ // eslint-disable-line
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
    addProject () {
      this.$router.push(`/${this.spaceName}/project/create`)
    },
    edit (row) {
      this.$router.push(`/${this.spaceName}/project/edit/${row.id}`)
    },
    editmembers (row) {
      this.$router.push(`/${this.spaceName}/project/members/${row.id}`)
    },
    renderEditTool (row) {
      if (row.enable_update) {
        return <el-button type="text" icon="el-icon-edit" size="small" onClick={() => this.edit({...row})}>编辑</el-button>
      } else {
        return null
      }
    },

    renderDeleteTool (row) {
      if (row.enable_delete) {
        return <el-button type="text" class="user-delete" icon="el-icon-delete" size="small" onClick={() => this.delete({...row})}>删除</el-button>
      } else {
        return null
      }
    },

    renderMemberTool (row) {
      if (row.enable_update) {
        return <el-button type="text" icon="el-icon-edit" size="small" onClick={() => this.editmembers({...row})}>成员管理</el-button>
      } else {
        return null
      }
    },

    async deleteRole (row) {
      await deleteProject(row.id)
      this.callServe()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    delete (row) {
      this.$confirm('确定删除该项目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRole(row)
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

@include b(project) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;

   .el-input {
     width: 300px;
   }

   .user-delete {
     color: #f56c6c;
   }

   .el-table thead th {
     background-color: $--table-header-background;
   }
}
</style>
