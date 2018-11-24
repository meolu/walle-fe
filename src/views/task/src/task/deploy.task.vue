<template>
    <div class="wl-task-deploy">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <div class="wl-task-deploy__header" v-if="task">
          <span class="title">{{task.project_name}}</span><span class="title">/</span><span class="title">{{task.name}}</span>
           <el-button type="success" size="small" @click="start" :disabled="isStart">开始</el-button>
        </div>
        <el-steps :active="activeStep" finish-status="finish" v-if="isStart">
          <el-step title="prev_deploy"></el-step>
            <el-step title="deploy"></el-step>
            <el-step title="post_deploy"></el-step>
            <el-step title="prev_release"></el-step>
            <el-step title="release"></el-step>
            <el-step title="post_release"></el-step>
        </el-steps>
        <deploy-log :value="record" v-if="isStart"></deploy-log>
    </div>
</template>
<script>
import io from 'socket.io-client'
import DeployLog from './log.vue'
import {getTask} from '@/services/task.service'
const STAGE = {
  prev_deploy: 1,
  deploy: 2,
  post_deploy: 3,
  prev_release: 4,
  release: 5,
  post_release: 6
}
export default {
  components: {DeployLog},
  props: {
    taskId: [String, Number],
    space: {
      type: String,
      required: true
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
          name: '发布'
        }
      ],
      activeStep: 0,
      record: [],
      loading: null,
      task: null,
      isStart: false
    }
  },
  created () {
    this.getTask()
  },
  destroyed () {
    console.log('destroyed')
    this.websock && this.websock.close() // 离开路由之后断开websocket连接
  },
  mounted () {
    this.initWebSocket()
  },
  methods: {
    async getTask () {
      const {data} = await getTask(this.taskId)
      this.task = data
    },
    start () {
      this.isStart = true
      this.websock.emit('deploy', {'task': this.taskId})
    },
    initWebSocket () { // 初始化weosocket
      const wsuri = `http://${location.host}/walle`
      this.websock = io.connect(wsuri, {
        reconnectionAttempts: 2
      })
      this.websock.on('connect', this.websocketonopen)
      // 2.返回construct, 初始化页面信息
      this.websock.on('construct', (data) => {
        console.log('construct', data)
        this.websock.emit('logs', {'task': this.taskId})
      })
      // 3.发送deploy命令之后, 将会收到console
      this.websock.on('console', this.websocketonconsole)
      this.websock.on('close', (data) => {
        console.log('close')
      })
      this.websock.on('error', this.websocketonerror)
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      this.loading && this.loading.close()
      let actions = {'task': this.taskId}
      this.websock.emit('open', actions)
    },
    websocketonerror () { // 连接建立失败取消loading
      this.loading && this.loading.close()
    },
    websocketonconsole ({data}) { // 接收log
      console.log('console', data)
      if (data && data.sequence && data.sequence >= 1) {
        this.isStart = true
      }
      this.record.push(data)
      if (data && data.stage) {
        this.activeStep = STAGE[data.stage]
      }
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(task-deploy) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   height: calc(100% - 40px);
   padding: 10px;
   display: flex;
   flex-direction: column;

   .el-steps {
     min-height: 80px;
   }

   .wl-breadcrumb {
     min-height: 35px;
   }

   @include e(header) {
     line-height: 40px;
     height: 40px;
     margin-bottom: 20px;

     .title {
       margin-right: 10px;
       font-size: 16px;
     }
   }
}
</style>
