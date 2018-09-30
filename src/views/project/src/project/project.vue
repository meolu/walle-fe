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
              <el-form-item>
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
export default {
  name: 'roles',
  data () {
    return {
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
      let {data: {list, count}} = await getProjects({
        size: table.page.size,
        page: table.page.currentPage,
        kw: this.value
      })
      table.page.total = count
      table.list = list
    },
    search () {
      this.callServe()
    },
    addProject () {
      this.$router.push(`/project/create`)
    },
    edit (row) {
      this.$router.push(`/project/edit/${row.id}`)
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
      this.$confirm('确定删除该角色吗?', '提示', {
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
