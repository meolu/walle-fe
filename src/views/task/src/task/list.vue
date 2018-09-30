<template>
    <div class="wl-task">
      <wl-breadcrumb :data="breadcrumbData" :isBackButton="false"></wl-breadcrumb>
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item>
                <el-input
                placeholder="请输入上线单名称"
                size="small"
                @keyup.enter.native="search"
                v-model="value">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="addTask">新建上线单</el-button>
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
import {getTasks, deleteTask} from '@/services/task.service'
export default {
  name: 'tasks',
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
          name: '上线单'
        }
      ]
    }
  },
  methods: {
    async callServe (table = this.$refs.table) {
      let {data: {list, count}} = await getTasks({
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
    addTask () {
      this.$router.push(`/task/create`)
    },
    edit (row) {
      this.$router.push(`/task/edit/${row.id}`)
    },
    review (row) {
    // 审核上线单
    },
    async deleteTask (row) {
      await deleteTask(row.id)
      this.callServe()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    delete (row) {
      this.$confirm('确定删除本上线单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTask(row)
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

@include b(task) {
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
