<template>
    <div class="wl-user-list">
            <el-form v-if="isSuper" :inline="true" @submit.native.prevent>
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
                  <el-button type="primary" size="small" icon="el-icon-edit" @click="addUser">新建</el-button>
                </el-form-item>
            </el-form>
            <div v-if="!isSuper" class="wl-user-list__wrap">
                <add-member @add="addMember" v-if="enableCreate"></add-member>
                <el-input
                    placeholder="请输入内容"
                    size="small"
                    class="no-super-search"
                    v-model="value">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                  </el-input>
                <el-button type="primary" size="small" v-if="enableCreate" icon="el-icon-edit" @click="addUser">新建</el-button>
            </div>
        <wl-table
            ref="table"
            :columns="columns"
            @callServe="callServe"></wl-table>
        <add-user-dialog :visible.sync="addUserDialogVisible" :user="currentEditUser" @confirm="confirm" @close="close"/>
        <edit-user-dialog :visible.sync="editUserDialogVisible" :spaceId="spaceId" :user="currentEditUser" @confirm="confirm" @close="close"></edit-user-dialog>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import COLUMNS from './columns'
import addUserDialog from './add.user.dialog.vue'
import editUserDialog from './edit.user.dialog.vue'
import {updateSpace, getSpace, getSpaceMembers} from '@/services/space.service'
import {getUsers, deleteUser, blockUser, activeUser} from '@/services/user.service'
import UserMixins from '@/mixins/user.mixins'
export default {
  name: 'user-list',
  mixins: [UserMixins],
  components: {
    addUserDialog,
    editUserDialog
  },
  data () {
    return {
      enableCreate: false,
      value: '',
      columns: COLUMNS.call(this),
      currentEditUser: null,
      addUserDialogVisible: false,
      editUserDialogVisible: false,
      spaceAllData: null
    }
  },
  watch: {
    value () {
      this.search()
    }
  },
  computed: {
    ...mapGetters(['spaceId', 'isSuper'])
  },
  async created () {
    if (this.spaceId) {
      const {data} = await getSpace(this.spaceId)
      this.spaceAllData = data
    }
  },
  methods: {
    async callServe (table = this.$refs.table) {
      let {data: {list, count, enable_create}} = this.isSuper // eslint-disable-line
        ? await getUsers({
          size: table.page.size,
          page: table.page.currentPage,
          kw: this.value
        })
        : await getSpaceMembers(this.spaceId, {
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
    async getAllMembers () {
      const {data} = await getSpace(this.spaceId)
      this.spaceAllData = data
    },
    async addMember (user) {
      await updateSpace(this.spaceId, {
        ...this.spaceAllData,
        members: JSON.stringify([].concat(this.spaceAllData.members, [user]))
      })
      this.getAllMembers()
      this.callServe()
      this.$message({
        type: 'success',
        message: '添加成功!'
      })
    },
    addUser () {
      this.addUserDialogVisible = true
    },
    edit (row) {
      if (this.isSuper) {
        this.addUserDialogVisible = true
      } else {
        this.editUserDialogVisible = true
      }
      this.currentEditUser = {
        ...row
      }
    },
    async lock (row) {
      if (row.status === '正常') {
        await blockUser(row.id)
      } else if (row.status === 2) {
        await activeUser(row.id)
      }
      this.callServe()
    },
    delete (row) {
      this.$confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(row)
      }).catch(() => {})
    },

    async deleteUser (row) {
      await deleteUser(row.id)
      this.callServe()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },

    confirm (user) {
      this.currentEditUser = null
      this.callServe()
    },

    close () {
      this.currentEditUser = null
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

    renderBlockTool (row) {
      if (row.enable_block) {
        return <el-button type="text" size="small" icon="wl-icon-lock" onClick={() => this.lock({...row})}>{row.status === '正常' ? '冻结' : '激活'}</el-button>
      } else {
        return null
      }
    },

    renderTools (scope) {
      return (
        <div>
          {this.renderEditTool(scope.row)}
          {this.renderDeleteTool(scope.row)}
          {this.renderBlockTool(scope.row)}
        </div>
      )
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(user-list) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;

   @include e(wrap) {
     text-align: right;
     margin-bottom: 10px;
   }

   .search {
     width: 300px;
   }

   .no-super-search {
     width: 300px;
     float: left;
     margin-bottom: 20px;
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

   .wl-search .el-input {
     margin-top: 2px;
   }

   .wl-search .el-input__suffix-inner {
     top: 0;
   }
}
</style>
