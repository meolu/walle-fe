<template>
    <div class="wl-project-edit">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <wl-split title="基本配置"></wl-split>
        <el-form ref="form1" :model="form" label-position="top" size="small" :inline="true">
          <el-form-item label="项目名称" prop="name" :rules="rules.name">
            <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="环境" prop="environment_id" :rules="rules.environment_id">
            <el-select v-model="form.environment_id" placeholder="请选择环境" :loading="loadingEnvironments">
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
        <el-form ref="form2" :model="form" label-position="top" size="small" :inline="true">
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
        <el-form ref="form3" :model="form" label-position="top" size="small" :inline="true" class="wl-project-edit__target">
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
        <el-form ref="form4" :model="form" label-position="top" size="small" :inline="true" class="wl-project-edit__editor">
          <el-form-item>
            <div slot="label"><span>部署排除文件</span><span class="fullscreen" @click="()=>fullscreenOpen('fullscreen1')">全屏编辑</span></div>
            <wl-fullscreen ref="fullscreen1">
              <codemirror v-model="form.excludes" :options="editorOption"></codemirror>
            </wl-fullscreen>
          </el-form-item>
          <el-form-item>
            <div slot="label"><span>高级任务-变量</span><span class="fullscreen" @click="()=>fullscreenOpen('fullscreen2')">全屏编辑</span></div>
            <wl-fullscreen ref="fullscreen2">
            <codemirror v-model="form.task_vars" :options="editorOption"></codemirror>
            </wl-fullscreen>
          </el-form-item>
          <el-form-item>
            <div slot="label"><span>高级任务-deploy prev</span><span class="fullscreen" @click="()=>fullscreenOpen('fullscreen3')">全屏编辑</span></div>
            <wl-fullscreen ref="fullscreen3">
            <codemirror v-model="form.prev_deploy" :options="editorOption"></codemirror>
            </wl-fullscreen>
          </el-form-item>
          <el-form-item>
            <div slot="label"><span>高级任务-deploy post</span><span class="fullscreen" @click="()=>fullscreenOpen('fullscreen4')">全屏编辑</span></div>
            <wl-fullscreen ref="fullscreen4">
            <codemirror v-model="form.post_deploy" :options="editorOption"></codemirror>
            </wl-fullscreen>
          </el-form-item>
          <el-form-item>
            <div slot="label"><span>高级任务-release prev</span><span class="fullscreen" @click="()=>fullscreenOpen('fullscreen5')">全屏编辑</span></div>
            <wl-fullscreen ref="fullscreen5">
            <codemirror v-model="form.prev_release" :options="editorOption"></codemirror>
            </wl-fullscreen>
          </el-form-item>
          <el-form-item>
            <div slot="label"><span>高级任务-release post</span><span class="fullscreen" @click="()=>fullscreenOpen('fullscreen6')">全屏编辑</span></div>
            <wl-fullscreen ref="fullscreen6">
            <codemirror v-model="form.post_release" :options="editorOption"></codemirror>
            </wl-fullscreen>
          </el-form-item>
        </el-form>
        <el-form ref="form5" :model="form" label-position="top" size="small" :inline="true">
          <el-form-item label="上线通知" prop="notice_type">
            <el-select v-model="form.notice_type" placeholder="请选择上线通知">
              <el-option key="notice_type1" label="短信通知" value="sms"></el-option>
              <el-option key="notice_type2" label="钉钉通知" value="dingding"></el-option>
              <el-option key="notice_type3" label="邮箱通知" value="email"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.notice_type && form.notice_type==='dingding'" label="钉钉hock地址" prop="notice_hook" :rules="rules.notice_hook">
            <el-input v-model="form.notice_hook" placeholder="请输入钉钉hock地址，英文分号分隔"></el-input>
          </el-form-item>
          <el-form-item v-if="form.notice_type && form.notice_type==='email'" label="邮箱地址" prop="notice_hook" :rules="rules.notice_hook">
            <el-input v-model="form.notice_hook" placeholder="请输入邮箱地址，英文分号分隔"></el-input>
          </el-form-item>
          <el-form-item v-if="form.notice_type && form.notice_type==='sms'" label="手机号" prop="notice_hook" :rules="rules.notice_hook">
            <el-input v-model="form.notice_hook" placeholder="请输入手机号，英文分号分隔"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="form6" :model="form" size="small" :inline="true">
          <el-form-item>
            <el-checkbox v-model="form.enable_audit">上线单是否开启审核</el-checkbox>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm">提交</el-button>
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
import {getEnvironments} from '@/services/environment.service'
import {getServers} from '@/services/server.service'
import {getProject, addProject, updateProject} from '@/services/project.service'
require('codemirror/mode/shell/shell')
export default {
  props: {
    id: String
  },
  components: {
    codemirror
  },
  created () {
    if (this.id) this.init()
    this.getEnvironments()
    this.getServers()
  },
  data () {
    return {
      breadcrumbData: [
        {
          to: '/project/index',
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
      form: this.initForm(),
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
        ],
        notice_hook: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isNew () {
      return !this.id
    }
  },
  methods: {
    initForm () {
      return {
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
        post_release: '',
        notice_type: '',
        notice_hook: '',
        enable_audit: '',
        status: 1
      }
    },
    async init () {
      const {data} = await getProject(this.id)
      this.target_servers = data.servers_info.map(item => item.id)
      this.form = {
        ...this.initForm(),
        ...data,
        enable_audit: !!data.enable_audit
      }
    },
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
    },
    filterMethod (query, item) {
      return item.name.indexOf(query) > -1
    },
    fullscreenOpen (name) {
      this.$refs[name] && this.$refs[name].toggle()
    },
    requestForm () {
      return {
        ...this.form,
        server_ids: this.target_servers.join(','),
        enable_audit: this.form.enable_audit ? 1 : 0
      }
    },
    submitForm () {
      let count = 0
      const callback = (valid) => {
        if (valid) {
          count++
          if (count === 4) this.submit()
        } else {
          return false
        }
      }
      this.$refs.form1.validate(callback)
      this.$refs.form2.validate(callback)
      this.$refs.form3.validate(callback)
      this.$refs.form5.validate(callback)
    },
    async submit () {
      console.log(this.requestForm())
      if (this.isNew) {
        await addProject(this.requestForm())
      } else {
        await updateProject(this.id, this.requestForm())
      }
      this.$message({
        type: 'success',
        message: this.isNew ? '添加成功' : '修改成功'
      })
      this.$router.push('/project/index')
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

   .wl-split {
     color: $primary;
     border-bottom: 1px solid $primary;
     margin-bottom: 20px;
   }

   .CodeMirror .CodeMirror-code {
     line-height: 18px;
   }

   .vue-codemirror-wrap,
   .CodeMirror {
     height: 100%;
   }

   .fullscreen {
     position: absolute;
     right: 0;
     top: 0;
     color: $primary;
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

     .el-form-item--mini.el-form-item,
     .el-form-item--small.el-form-item  {
       position: relative;
    }
   }
}
</style>
