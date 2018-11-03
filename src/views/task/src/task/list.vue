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
import {getTasks, deleteTask, auditTask, rejectTask} from '@/services/task.service'
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
    renderReview (row) {
      if (row.status === 0) {
        return <el-popover
          placement="bottom-start">
          <div class="wl-task__review">
            <p>审核是否通过？</p>
            <div class="footer">
              <el-button type="text" size="small" onClick={() => { this.rejectTask(row) }}>驳回</el-button>
              <el-button type="primary" size="mini" onClick={() => { this.auditTask(row) }}>通过</el-button>
            </div>
          </div>
          <el-button type="text" class="review" slot="reference" size="small">审核</el-button>
        </el-popover>
      }
      return null
    },
    closePopover () {
      document.body.click()
    },
    renderDeploy (row) {
      if (row.status === 1) {
        return <el-button type="text" size="small" onClick={() => this.deploy({...row})}>上线</el-button>
      }
      return null
    },
    async rejectTask (row) {
      // 驳回上线单
      await rejectTask(row.id)
      this.closePopover()
      this.callServe()
      this.$message({
        type: 'success',
        message: '审核驳回!'
      })
    },
    async auditTask (row) {
      // 审核上线单
      await auditTask(row.id)
      this.closePopover()
      this.callServe()
      this.$message({
        type: 'success',
        message: '审核通过!'
      })
    },
    deploy (row) {
      // 上线
      this.$router.push(`/task/deploy/${row.id}`)
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
    },
    getClass (row) {
      if (row.status !== 0 && row.status !== 1) {
        return 'empty'
      }
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

   .cell .review {
     margin-right: 10px;
   }
   .cell .empty {
     margin-left: 36px;
   }

   @include e(review) {
    p {
      text-align: center;
      font-size: 14px;
      line-height: 30px;
      margin-bottom: 10px;
    }

    .footer {
      text-align: right;
    }
  }
}
</style>
