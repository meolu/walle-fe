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
    taskId: [String, Number]
  },
  data () {
    return {
      breadcrumbData: [
        {
          to: '/deploy/index',
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
      reConnectCount: 5,
      task: null,
      isStart: false
    }
  },
  created () {
    this.getTask()
  },
  destroyed () {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    async getTask () {
      const {data} = await getTask(this.taskId)
      this.task = data
    },
    start () {
      this.isStart = true
      this.initWebSocket()
    },
    initWebSocket () { // 初始化weosocket
      const wsuri = `ws://api.walle-web.io/websocket/console`
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.reConnectCount--
      // this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      this.loading && this.loading.close()
      let actions = {'text': this.taskId}
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror () { // 连接建立失败重连
      if (!this.loading) {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      if (this.reConnectCount > 0) {
        this.initWebSocket()
      }
    },
    websocketonmessage (e) { // 数据接收
      const redata = JSON.parse(e.data)
      this.record.push(redata)
      if (redata && redata.stage) {
        this.activeStep = STAGE[redata.stage]
      }
    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
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
