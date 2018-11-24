<template>
    <div class="wl-project-member">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <el-card>
            <div class="wl-project-member__add-header">
                添加成员
            </div>
            <div class="wl-project-member__add-body">
                <el-form ref="form" :model="form" label-width="80px" size="small" :rules="rules">
                    <el-form-item label="成员名称" prop="username" :error="error.username">
                        <select-user ref="selectUser" @select="handleFilterSelect" :members="members" :value="form.username" :spaceId="spaceId"></select-user>
                    </el-form-item>
                    <el-form-item label="成员角色" prop="role_id">
                        <el-select size="small" v-model="form.role_id" placeholder="请分配角色" :style="{width: '400px'}">
                            <el-option v-for="(role, index) in roles" :key="index" :label="role" :value="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="wl-project-member__add-footer">
                <el-button type="primary" size="small" @click="addMember">添加</el-button>
            </div>
        </el-card>
        <div class="wl-project-member__list-container">
            <div class="wl-project-member__add-header">{{`成员列表 (${members.length})`}}</div>
            <div>
              <div class="wl-project-member__user-row" v-for="user in members" :key="user.id">
                    <div class="wl-project-member__user-info">
                        <img class="icon" :src="user.avatar || defaultIcon"/>
                        <span class="wl-group-users__name">{{user.username}}</span>
                    </div>
                    <div class="wl-project-member__tool">
                      <span class="role-name">{{roles[user.role]}}</span>
                      <el-button type="primary" size="small" icon="el-icon-edit" circle @click="()=>{editItem(user)}"></el-button>
                      <el-button type="danger" size="small" icon="el-icon-delete" circle @click="()=>{deleteItem(user)}"></el-button>
                    </div>
              </div>
            </div>
        </div>
        <edit-member-dialog :visible.sync="editDialogVisible" :roles="roles" :member="editCurrentMember" @confirm="confirm"></edit-member-dialog>
    </div>
</template>

<script>
import {getProject, updateProjectMembers} from '@/services/project.service'
import {getRoles} from '@/services/role.service'
import {ROLES_PROJECT} from '@/config/global.config'
import SelectUser from './select.user.vue'
import EditMemberDialog from './edit.member.dialog.vue'

const defaultIcon = 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
export default {
  components: {SelectUser, EditMemberDialog},
  props: {
    id: {
      type: String,
      required: true
    },
    space: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      breadcrumbData: [
        {
          to: `/${this.space}/project/index`,
          name: '项目'
        },
        {
          to: '',
          name: '成员管理'
        }
      ],
      defaultIcon,
      form: {
        username: '',
        role_id: ''
      },
      rules: {
        role_id: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      },
      error: {
        username: ''
      },
      members: [], // 当前项目的成员列表
      roles: ROLES_PROJECT,
      project: null, // 当前项目信息
      editDialogVisible: false,
      editCurrentMember: null
    }
  },
  created () {
    this.getProject()
    // this.getRoles()
  },
  computed: {
    isNew () {
      return this.id === undefined
    },
    spaceId () {
      return this.project ? this.project.space_id : ''
    }
  },
  watch: {
    'form.username': {
      handler (val) {
        if (val) {
          this.error.username = ''
        }
      }
    }
  },
  methods: {
    handleFilterSelect (user) {
      Object.assign(this.form, {
        ...user
      })
    },
    addMember () {
      let isvalid = true
      if (!this.form.username) {
        this.error.username = '请选择用户名'
        isvalid = false
      }
      this.$refs.form.validate((valid) => {
        if (valid && isvalid) {
          let newMember = [{
            user_id: this.form.user_id,
            role: this.form.role_id
          }]
          this.updateProject(newMember)
        } else {
          return false
        }
      })
    },
    async getProject () {
      let {data} = await getProject(this.id)
      this.project = data
      this.members = data.members || []
    },
    async updateProject (newMember = []) {
      await updateProjectMembers(this.id, this.requestForm(newMember))
      this.form = {
        username: '',
        role_id: ''
      }
      this.getProject()
    },
    async getRoles () {
      let {data: {list}} = await getRoles()
      this.roles = list
    },
    requestForm (newMember) {
      return [].concat(this.members, newMember)
    },
    editItem (item) {
      this.editDialogVisible = true
      this.editCurrentMember = item
    },
    deleteItem (item) {
      let {id} = item
      this.members = this.members.filter(item => {
        return item.id !== id
      })
      this.updateProject()
    },
    confirm (form) {
      Object.assign(this.editCurrentMember, {
        ...form
      })
      this.updateProject()
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(project-member) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;
   display: flex;
   flex-direction: column;

   .el-card__body {
       padding: 0;
   }

   @include e(add-header) {
       border-bottom: 1px solid #ebeef5;
       padding: 0 20px;
       background: #fafafa;
       color: #5c5c5c;
       font-size: 15px;
       line-height: 50px;
   }

   @include e(add-footer) {
       border-top: 1px solid #ebeef5;
       display: flex;
       justify-content: space-between;
       align-items: center;
       height: 50px;
       padding: 0 20px;
       background: #fafafa;
   }

   @include e(add-body) {
       padding: 20px;
   }

   @include e(list-container) {
       border: 1px solid #ebeef5;
       border-radius: 4px;
       margin-top: 20px;
   }

   @include e(user-row) {
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 10px 20px;
     border-bottom: 1px solid #ebeef5;
   }

   @include e(user-info) {
       display: flex;
       justify-content: flex-start;
       align-items: center;

       .icon {
         width: 24px;
         height: 24px;
         margin-right: 10px;
       }
  }

  @include e(tool) {
    .role-name {
      margin-right: 10px;
    }
  }
}
</style>
