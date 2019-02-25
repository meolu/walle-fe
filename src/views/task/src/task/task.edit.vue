<template>
    <div class="wl-task-edit">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <div class="wl-task-edit__content">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules" size="small">
                <el-form-item label="上线单标题" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item v-if="project&&project.repo_mode==='branch'" label="选取分支">
                    <el-select v-model="form.branch" placeholder="选取分支" allow-create filterable v-loading="branchLoading">
                        <el-option v-for="item in branchs" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    <i v-if="!branchLoading" class="wl-icon-refresh wl-task-edit__refresh" @click="emitBranches"></i>
                </el-form-item>
                <el-form-item v-if="project&&project.repo_mode==='tag'" label="选取Tag">
                    <el-select v-model="form.tag" placeholder="选取Tag" allow-create filterable v-loading="tagLoading">
                        <el-option v-for="item in tags" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    <i v-if="!tagLoading" class="wl-icon-refresh wl-task-edit__refresh" @click="emitTags"></i>
                </el-form-item>
                <el-form-item  v-if="project&&project.repo_mode==='branch'" label="选取版本">
                    <el-select v-model="form.commit_id" placeholder="先选取分支再选取版本" v-loading="commitLoading">
                        <el-option v-for="item in commits" :key="item.id" :label="`${item.id}#${item.message}`" :value="item.id"></el-option>
                    </el-select>
                    <i v-if="!commitLoading" class="wl-icon-refresh wl-task-edit__refresh" @click="emitCommits"></i>
                </el-form-item>
                <el-form-item label="选取服务器">
                    <el-radio-group v-model="form.servers_mode">
                        <el-radio label="全量服务器上线"></el-radio>
                        <el-radio label="自定义服务器上线"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.servers_mode==='自定义服务器上线'">
                    <div class="wl-task-edit__servers">
                      <el-tag
                        v-for="(tag,i) in form.servers"
                        :key="tag.id"
                        @close="()=>deleteServer(tag,i)"
                        closable
                        type='info'>
                        {{tag.name}}
                      </el-tag>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {getProject} from '@/services/project.service'
import {getTask, addTask, updateTask} from '@/services/task.service'
import {setCookie, getCookie} from '@/utils/cookies'
import io from 'socket.io-client'

export default {
  props: {
    taskId: String,
    space: {
      type: String,
      required: true
    }
  },
  async created () {
    if (this.isNew) {
      this.getProject(this.$route.params.projectId)
    } else {
      await this.getTask()
      this.getProject()
    }
  },
  data () {
    return {
      breadcrumbData: [
        {
          to: `/${this.space}/deploy/index`,
          name: '上线单'
        },
        {
          to: '',
          name: this.id ? '编辑' : '创建'
        }
      ],
      project: {},
      task: {},
      branchs: [],
      tags: [],
      commits: [],
      form: {
        name: '',
        branch: '',
        commit_id: '',
        servers_mode: '全量服务器上线',
        servers: [],
        tag: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入上线单名称', trigger: 'blur' }
        ]
      },
      branchLoading: false,
      tagLoading: true,
      commitLoading: false,
      isRequestCommit: false,
      websocketOpen: false
    }
  },
  computed: {
    isNew () {
      return this.$route.name === 'TaskCreateOfProject' && !this.taskId
    }
  },
  watch: {
    'form.servers_mode': {
      immediate: true,
      handler (val) {
        if (val === '全量服务器上线') {
          this.form.servers = this.project && this.project.servers_info ? [].concat(this.project.servers_info) : []
        }
      }
    },
    'form.branch': {
      async handler (val) {
        if (val) {
          setCookie(`projectID_${this.task.project_id || this.project.id}`, val, null, '/')
          this.emitCommits()
        }
      }
    },
    websocketOpen (val) {
      if (val && this.isRequestCommit) {
        this.isRequestCommit = false
        this.websock.emit('commits', {
          branch: this.form.branch
        })
      }
    }
  },
  destroyed () {
    this.websock && this.websock.disconnect() // 离开路由之后断开websocket连接
  },
  methods: {
    checkServers () {
      if (this.project.servers_info.length === this.task.servers_info.length) {
        return '全量服务器上线'
      } else {
        return '自定义服务器上线'
      }
    },
    async getProject (projectId) {
      const {data} = await getProject(projectId || this.task.project_id)
      this.project = data
      if (!this.isNew) {
        this.form.servers = this.task.servers_info
      } else {
        this.form.servers = [].concat(this.project.servers_info)
      }
      if (!this.isNew) {
        this.form.servers_mode = this.checkServers()
      }
      const projectBranch = getCookie(`projectID_${this.project.id}`)
      if (projectBranch && !this.form.branch && data.repo_mode === 'branch') {
        this.form.branch = projectBranch
      }
      this.initWebSocket()
    },
    async getTask () {
      try {
        const {data} = await getTask(this.$route.params.taskId)
        this.task = data
        this.form = {
          ...this.form,
          ...data
        }
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    requertForm () {
      const params = {
        name: this.form.name,
        project_id: this.project.id,
        servers: this.form.servers.map(item => item.id).join(','),
        commit_id: this.form.commit_id,
        branch: this.form.branch,
        file_transmission_mode: 0,
        file_list: '*.log',
        tag: this.form.tag
      }
      return params
    },
    onSubmit () {
      this.$refs.form.validate((vaild) => {
        let isPass = false
        if (this.project && this.project.repo_mode === 'tag') {
          isPass = this.form.tag
        } else {
          isPass = this.form.commit_id && this.form.branch
        }
        !isPass && this.$message.error('请选择版本')
        if (vaild && isPass) {
          if (this.isNew) {
            this.addTask()
          } else {
            this.updateTask()
          }
        } else {
          return false
        }
      })
    },
    async addTask () {
      await addTask(this.requertForm())
      this.$message({
        type: 'success',
        message: '添加成功'
      })
      this.$router.push(`/${this.space}/deploy/index`)
    },
    async updateTask () {
      await updateTask(this.$route.params.taskId, this.requertForm())
      this.$message({
        type: 'success',
        message: '修改成功'
      })
      this.$router.push(`/${this.space}/deploy/index`)
    },
    deleteServer (tag, index) {
      this.form.servers.splice(index, 1)
    },
    initWebSocket () { // 初始化weosocket
      const wsuri = `${document.location.protocol}//${location.host}/walle`
      this.websock = io.connect(wsuri, {
        reconnectionAttempts: 2
      })
      this.websock.on('connect', this.websocketonopen)
      this.websock.on('branches', this.getWebsocketBranch)
      this.websock.on('commits', this.getWebsocketCommit)
      this.websock.on('tags', this.getWebsocketTag)
    },
    emitBranches () {
      this.branchLoading = true
      this.websock.emit('branches')
    },
    emitTags () {
      this.tagLoading = true
      this.websock.emit('tags')
    },
    emitCommits () {
      if (this.form.branch) {
        if (this.websock) {
          this.commitLoading = true
          this.websock.emit('commits', {
            branch: this.form.branch
          })
        } else {
          this.isRequestCommit = true
        }
      } else {
        this.$message.error('请先选择分支')
      }
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      this.websock.emit('open', {
        project_id: this.project.id || this.task.project_id
      })
      if (this.project.repo_mode === 'branch') {
        this.websocketOpen = true
        // if (!this.form.branch) {
        //   this.emitBranches()
        // }
      } else {
        this.emitTags()
      }
    },
    getWebsocketBranch (data) {
      this.branchLoading = false
      if (data.event === 'branches') {
        this.branchs = data.data
        if (this.branchs && this.branchs.length > 0 && !this.form.branch) {
          this.form.branch = this.branchs[0]
        }
      } else if (data.event === 'error') {
        this.branchs = []
        this.$message.error(data.data.message)
      }
    },
    getWebsocketCommit (data) {
      this.commitLoading = false
      if (data.event === 'commits') {
        this.commits = data.data
        if (this.commits && this.commits.length > 0 && !this.form.commit_id) {
          this.form.commit_id = this.commits[0].id
        }
      } else if (data.event === 'error') {
        this.commits = []
        this.$message.error(data.data.message)
      }
    },
    getWebsocketTag (data) {
      this.tagLoading = false
      if (data.event === 'tags') {
        this.tags = data.data
        if (this.tags && this.tags.length > 0 && !this.form.tag) {
          this.form.tag = this.tags[0]
        }
      } else if (data.event === 'error') {
        this.tags = []
        this.$message.error(data.data.message)
      }
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(task-edit) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;
   display: flex;
   flex-direction: column;

   @include e(content) {
       width: 500px;
   }

   @include e(servers) {
    width: 300px;
    border: 1px dashed #ddd;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;

    .el-tag--info {
      @include text-overflow-1;

      position: relative;
      margin-bottom: 10px;
    }

    .el-tag .el-icon-close {
      position: absolute;
      right: 5px;
      top: 7px;
    }
   }

   @include e(refresh) {
    margin-left: 10px;
    color: #666;
    margin-top: 3px;
   }
}
</style>
