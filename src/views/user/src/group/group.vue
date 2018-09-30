<template>
    <div class="wl-group">
      <wl-breadcrumb :data="breadcrumbData" :isBackButton="false"></wl-breadcrumb>
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item>
                <el-input
                placeholder="请输入用户组"
                size="small"
                @keyup.enter.native="search"
                v-model="value">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="addGroup">添加用户组</el-button>
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
import {getGroups, deleteUser} from '@/services/group.service'
export default {
  name: 'user-group',
  data () {
    return {
      breadcrumbData: [
        {
          to: '',
          name: '用户组'
        }
      ],
      value: '',
      columns: COLUMNS.call(this),
      form: {
        search: ''
      }
    }
  },
  methods: {
    async callServe (table = this.$refs.table) {
      let {data: {list, count}} = await getGroups({
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
    addGroup () {
      this.$router.push(`/user/group/create`)
    },
    edit (row) {
      this.$router.push(`/user/group/edit/${row.id}`)
    },
    delete (row) {
      this.$confirm('确定删除该用户组吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleteUser (row) {
      await deleteUser(row.id)
      this.callServe()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(group) {
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
