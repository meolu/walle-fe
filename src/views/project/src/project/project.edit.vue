<template>
    <div class="wl-project-edit">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
    </div>
</template>

<script>
// import {addRole, updateRole, getRole} from '@/services/role.service'
export default {
  props: {
    id: String
  },
  watch: {
    async id (val) {
    //   let {data: {role_name, access_ids}} = await getRole(val) // eslint-disable-line
    //   this.name = role_name // eslint-disable-line
    //   this.data = access_ids // eslint-disable-line
    }
  },
  computed: {
    isNew () {
      return !this.id
    }
  },
  data () {
    return {
      breadcrumbData: [
        {
          to: '/project/list',
          name: '项目'
        },
        {
          to: '',
          name: this.id ? '编辑' : '创建'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(project-edit) {
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
