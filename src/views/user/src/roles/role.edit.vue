<template>
    <div class="wl-role-edit">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <el-form :inline="true" @submit.native.prevent ref="form">
             <el-form-item :rules="rules.name">
                <el-input
                placeholder="角色名称"
                size="small"
                v-model="name"/>
            </el-form-item>
        </el-form>
        <el-table
        :data="data"
        :span-method="objectSpanMethod"
        :show-header="false"
        border
        style="width: 100%; margin-top: 20px">
            <el-table-column
                prop="module"
                width="180">
            </el-table-column>
            <el-table-column
                prop="controller"
                width="180">
            </el-table-column>
            <el-table-column>
                <template slot-scope="{row}">
                    <el-checkbox-group v-model="row.permission" @change="handleCheckedPermissionChange(row)">
                        <el-checkbox v-for="permission in permissions" :label="permission.id" :key="permission.id">{{permission.name}}</el-checkbox>
                    </el-checkbox-group>
                </template>
            </el-table-column>
        </el-table>
        <el-form :inline="true" class="submit-form">
            <el-form-item>
               <el-button type="primary" size="small" @click="submit">submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {roleData, permissions} from './constant'
import {addRole, updateRole, getRole} from '@/services/role.service'
export default {
  props: {
    id: String
  },
  watch: {
    async id (val) {
      let {data: {role_name, access_ids}} = await getRole(val) // eslint-disable-line
      this.name = role_name // eslint-disable-line
      this.data = access_ids // eslint-disable-line
    }
  },
  computed: {
    isNew () {
      return !this.id
    }
  },
  data () {
    return {
      data: roleData,
      permissions: permissions,
      name: '',
      breadcrumbData: [
        {
          to: '/user/roles',
          name: '角色'
        },
        {
          to: '',
          name: this.id ? '编辑' : '创建'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleCheckedPermissionChange (row) {
      console.log(row)
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sendData()
        } else {
          return false
        }
      })
    },
    requestData () {
      return {
        role_name: this.name,
        permission_ids: this.data
      }
    },
    async sendData () {
      this.error = this.initError()
      this.isNew && await addRole(this.requestData())
      this.isNew || await updateRole(this.user.id, this.requestData())
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(role-edit) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;

   .el-input {
     width: 300px;
   }

   .el-table {
      margin-top: 0 !important;
      margin-bottom: 20px;
   }

   .submit-form {
       text-align: right;
   }
}
</style>
