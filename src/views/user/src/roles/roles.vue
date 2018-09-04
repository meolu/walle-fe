<template>
    <div class="wl-roles">
            <el-form :inline="true">
              <el-form-item>
                <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                size="small"
                v-model="value"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small">添加</el-button>
              </el-form-item>
            </el-form>
        <wl-table
            ref="table"
            :columns="columns"
            :pageSize="15"
            @callServe="callServe"></wl-table>
    </div>
</template>

<script>
import COLUMNS from './columns'
export default {
  name: 'roles',
  data () {
    return {
      value: '',
      columns: COLUMNS.call(this),
      form: {
        search: ''
      }
    }
  },
  methods: {
    callServe (table = this.$refs.table) {
      table.page = {
        total: 100,
        size: 15,
        currentPage: 1
      }
      table.list = [{
        name: '角色1',
        userCount: 5,
        id: 1
      },
      {
        name: '角色1',
        userCount: 5,
        id: 2
      },
      {
        name: '角色1',
        userCount: 5,
        id: 3
      },
      {
        name: '角色1',
        userCount: 5,
        id: 4
      },
      {
        name: '角色1',
        userCount: 5,
        id: 5
      },
      {
        name: '角色1',
        userCount: 5,
        id: 6
      },
      {
        name: '角色1',
        userCount: 5,
        id: 7
      },
      {
        name: '角色1',
        userCount: 5,
        id: 8
      },
      {
        name: '角色1',
        userCount: 5,
        id: 9
      },
      {
        name: '角色1',
        userCount: 5,
        id: 10
      },
      {
        name: '角色1',
        userCount: 5,
        id: 11
      }]
    },
    edit (row) {
      console.log(row)
      this.$router.push(`/user/roles/${row.id}`)
    },
    delete (row) {

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
}
</style>
