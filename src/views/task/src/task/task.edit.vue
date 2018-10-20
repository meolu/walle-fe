<template>
    <div class="wl-task-edit">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <div class="wl-task-edit__content">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules" size="small">
                <el-form-item label="上线单标题" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item v-if="project&&project.repo_mode==='branch'" label="选取分支">
                    <el-select v-model="form.branch" placeholder="选取分支">
                        <el-option v-for="item in branchs" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="project&&project.repo_mode==='tag'" label="选取Tag">
                    <el-select v-model="form.tag" placeholder="选取Tag">
                        <el-option v-for="item in tags" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  v-if="project&&project.repo_mode==='branch'" label="选取版本">
                    <el-select v-model="form.commit_id" placeholder="选取版本">
                        <el-option v-for="item in commits" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
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
import {getBranches, getTags, getCommits} from '@/services/repo.service'

export default {
  props: {
    taskId: String
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
          to: '/task/list',
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
      }
    }
  },
  computed: {
    isNew () {
      return this.$route.name === 'TaskCreateOfProject' && !this.taskId
    }
  },
  methods: {
    checkServers () {
      if (this.project.server_ids.length === this.task.servers.split(',').length) {
        return '全量服务器上线'
      } else {
        return '自定义服务器上线'
      }
    },
    async getProject (projectId) {
      const {data} = await getProject(projectId || this.task.project_id)
      this.project = data
      if (!this.isNew) {
        this.form.servers = this.project.server_ids.filter(item => {
          return this.task.servers.split(',').indexOf(item.id.toString()) > -1
        })
      } else {
        this.form.servers = [].concat(this.project.server_ids)
      }
      if (!this.isNew) {
        this.form.servers_mode = this.checkServers()
      }
      if (this.project.repo_mode === 'branch') {
        const {data: {branches}} = await getBranches({
          project_id: this.project.id
        })
        this.branchs = branches
      } else {
        const {data: {tags}} = await getTags({
          project_id: this.project.id
        })
        this.tags = tags
      }
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
      console.log(params)
      return params
    },
    onSubmit () {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
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
      this.$router.push('/task/list')
    },
    async updateTask () {
      await updateTask(this.$route.params.taskId, this.requertForm())
      this.$message({
        type: 'success',
        message: '修改成功'
      })
      this.$router.push('/task/list')
    },
    deleteServer (tag, index) {
      this.form.servers.splice(index, 1)
    }
  },
  watch: {
    'form.servers_mode': {
      immediate: true,
      handler (val) {
        if (val === '全量服务器上线') {
          this.form.servers = this.project && this.project.server_ids ? [].concat(this.project.server_ids) : []
        }
      }
    },
    'form.branch': {
      async handler (val) {
        const {data: {branches}} = await getCommits({
          project_id: this.project.id,
          branch: val
        })
        this.commits = branches
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
}
</style>
