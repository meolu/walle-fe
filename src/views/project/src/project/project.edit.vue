<template>
    <div class="wl-project-edit">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <wl-split title="基本配置"></wl-split>
        <el-form ref="form" :model="form" label-position="top" size="small" :inline="true">
          <el-form-item label="项目名称" prop="name" :rules="rules.name">
            <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="环境" prop="environment_id" :rules="rules.environment_id">
            <el-select v-model="form.environment_id" placeholder="请选择环境" :multiple="true" :loading="loadingEnvironments">
              <el-option v-for="environment in environments" :key="'environment'+environment.id" :label="environment.env_name" :value="environment.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Git Repo" prop="repo_url" :rules="rules.repo_url">
            <el-input v-model="form.repo_url" placeholder="请输入项目git地址"></el-input>
          </el-form-item>
          <el-form-item label="分支/tag" prop="repo_mode">
            <el-select v-model="form.repo_mode" placeholder="请选择模式">
              <el-option key="mode_tag" label="tag" value="tag"></el-option>
              <el-option key="mode_branch" label="branch" value="branch"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <wl-split title="目标集群"></wl-split>
        <el-form ref="form" :model="form" label-position="top" size="small" :inline="true">
          <el-form-item label="目标集群登录用户" prop="target_user" :rules="rules.target_user">
            <el-input v-model="form.target_user" placeholder="请输入目标集群用户名"></el-input>
          </el-form-item>
          <el-form-item label="目标集群登录端口" prop="target_port" :rules="rules.target_port">
            <el-input v-model="form.target_port" placeholder="请输入目标集群登录端口"></el-input>
          </el-form-item>
        </el-form>
        <el-transfer
          filterable
          :titles="['服务器', '目标集群']"
          :filter-method="filterMethod"
          filter-placeholder="请输入服务器名称"
          :props="serverProps"
          v-model="target_servers"
          :data="servers">
        </el-transfer>
        <el-form ref="form" :model="form" label-position="top" size="small" :inline="true" class="wl-project-edit__target">
          <el-form-item label="目标集群部署路径" prop="target_root" :rules="rules.target_root">
            <el-input v-model="form.target_root" placeholder="请输入目标集群部署路径"></el-input>
          </el-form-item>
          <el-form-item label="目标集群部署仓库" prop="target_releases" :rules="rules.target_releases">
            <el-input v-model="form.target_releases" placeholder="请输入目标集群部署仓库"></el-input>
          </el-form-item>
          <el-form-item label="目标集群部署仓库版本保留数" prop="keep_version_num">
            <el-input v-model="form.keep_version_num" placeholder="请输入目标集群部署仓库版本保留数"></el-input>
          </el-form-item>
        </el-form>
        <wl-split title="任务配置"></wl-split>
        <el-form ref="form" :model="form" label-position="top" size="small" :inline="true" class="wl-project-edit__editor">
          <el-form-item label="部署排除文件">
             <codemirror v-model="form.excludes" :options="editorOption"></codemirror>
          </el-form-item>
          <el-form-item label="高级任务-变量">
            <codemirror v-model="form.task_vars" :options="editorOption"></codemirror>
          </el-form-item>
          <el-form-item label="高级任务-deploy prev">
            <codemirror v-model="form.prev_deploy" :options="editorOption"></codemirror>
          </el-form-item>
          <el-form-item label="高级任务-deploy post">
            <codemirror v-model="form.post_deploy" :options="editorOption"></codemirror>
          </el-form-item>
          <el-form-item label="高级任务-release prev">
            <codemirror v-model="form.prev_release" :options="editorOption"></codemirror>
          </el-form-item>
          <el-form-item label="高级任务-release post">
            <codemirror v-model="form.post_release" :options="editorOption"></codemirror>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import {addRole, updateRole, getRole} from '@/services/role.service'
import { codemirror } from 'vue-codemirror-lite'
import {getEnvironments} from '@/services/environment.service'
import {getServers} from '@/services/server.service'
require('codemirror/mode/shell/shell')
export default {
  props: {
    id: String
  },
  components: {
    codemirror
  },
  created () {
    this.getEnvironments()
    this.getServers()
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
      ],
      environments: [],
      loadingEnvironments: true,
      servers: [],
      target_servers: [],
      serverProps: {
        key: 'id',
        label: 'name'
      },
      editorOption: {
        mode: 'shell',
        lineNumbers: true,
        matchBrackets: true
      },
      form: {
        name: '',
        environment_id: '',
        repo_url: '',
        repo_mode: 'branch',
        target_user: '',
        target_port: '',
        excludes: '',
        server_ids: '',
        keep_version_num: '',
        target_root: '',
        target_library: '',
        task_vars: '',
        prev_deploy: '',
        post_deploy: '',
        prev_release: '',
        post_release: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        repo_url: [
          { required: true, message: '请输入git地址', trigger: 'blur' }
        ],
        environment_id: [
          { required: true, message: '请选择环境', trigger: 'blur' }
        ],
        target_user: [
          { required: true, message: '请输入目标集群用户', trigger: 'blur' }
        ],
        target_port: [
          { required: true, message: '请输入目标集群登录端口', trigger: 'blur' }
        ],
        target_root: [
          { required: true, message: '请输入目标集群部署路径', trigger: 'blur' }
        ],
        target_releases: [
          { required: true, message: '请输入目标集群部署仓库', trigger: 'blur' }
        ]
      }
    }
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
  methods: {
    async getEnvironments () {
      const {data: {list}} = await getEnvironments({}, {
        isRemoveField: true,
        isLoading: false
      })
      this.loadingEnvironments = false
      this.environments = list
    },
    async getServers () {
      let {data: {list}} = await getServers()
      this.servers = list
      console.log(this.servers)
    },
    filterMethod (query, item) {
      return item.name.indexOf(query) > -1
    }
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

   .el-input,
   .el-textarea {
     width: 400px;
   }

   .el-table {
      margin-top: 0 !important;
      margin-bottom: 20px;
   }

   .submit-form {
       text-align: right;
   }

   .el-form-item--small .el-form-item__content,
   .el-form-item--small .el-form-item__label {
     padding: 0;
     line-height: 28px;
   }

   .el-form-item--mini.el-form-item,
   .el-form-item--small.el-form-item {
     margin-right: 94px;
   }

   .el-transfer-panel {
     width: 400px;
   }

   .el-transfer .el-input {
     width: auto;
   }

   .el-transfer {
     margin: 10px 0 20px 0;
   }

   @include e(target) {
    .el-input {
        width: 280px;
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item  {
       margin-right: 23px;
    }
   }

   @include e(editor) {
     .el-form-item__content {
       border: 1px solid $border-color;
       width: 400px;
       height: 100px;
       overflow: auto;
     }
   }
}
</style>
