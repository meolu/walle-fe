<template>
    <div class="wl-task-deploy">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <el-steps :active="activeStep" finish-status="finish">
            <el-step title="prev_release"></el-step>
            <el-step title="release"></el-step>
            <el-step title="post_release"></el-step>
            <el-step title="prev_deploy"></el-step>
            <el-step title="deploy"></el-step>
            <el-step title="post_deploy"></el-step>
        </el-steps>
        <deploy-log :value="record"></deploy-log>
    </div>
</template>
<script>
import DeployLog from './log.vue'
const STAGE = {
  prev_release: 1,
  release: 2,
  post_release: 3,
  prev_deploy: 4,
  deploy: 5,
  post_deploy: 6
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
      reConnectCount: 5
    }
  },
  created () {
    this.initWebSocket()
  },
  destroyed () {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
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
      // this.activeStep++
      console.log(redata)
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
}
</style>
