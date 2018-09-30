<template>
    <div class="wl-task-edit">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <div class="wl-task-edit__content">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules" size="small">
                <el-form-item label="上线单标题" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="选取分支">
                    <el-select v-model="form.branch" placeholder="选取分支">
                        <el-option v-for="item in branchs" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选取Tag">
                    <el-select v-model="form.tag" placeholder="选取Tag">
                        <el-option v-for="item in tags" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选取版本">
                    <el-select v-model="form.commit_id" placeholder="选取版本">
                        <el-option v-for="item in commits" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选取服务器">
                    <el-radio-group v-model="form.servers_mode">
                        <el-radio label="全量服务器上线"></el-radio>
                        <el-radio label="自定义服务器上线"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选取文件">
                    <el-radio-group v-model="form.file_transmission_mode">
                        <el-radio label="文件全量上线"></el-radio>
                        <el-radio label="文件增量上线"></el-radio>
                    </el-radio-group>
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
export default {
  props: {
    id: String
  },
  created () {
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
      branchs: [
        'aaa', 'bbb', 'ccc'
      ],
      tags: [
        '11', '22', '33'
      ],
      commits: [
        'qwe123', '1234fds', 'hgf43'
      ],
      form: {
        name: '',
        branch: '',
        commit_id: '',
        servers_mode: '全量服务器上线',
        servers: '',
        file_transmission_mode: '文件全量上线',
        file_list: ''
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
      return !this.id
    }
  },
  methods: {
    async getProject () {
      const {data} = await getProject(this.task.project_id)
      this.project = data
    },
    onSubmit () {

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
}
</style>
