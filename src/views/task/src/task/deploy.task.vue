<template>
    <div class="wl-task-deploy">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <div class="wl-task-deploy__header" v-if="task">
          <span class="title">{{task.project_name}}</span><span class="title">/</span><span class="title">{{task.name}}</span>
           <el-button type="success" size="small" @click="start" :disabled="isStart&&noRun">开始</el-button>
        </div>
        <el-steps :active="activeStep" finish-status="finish" v-if="isStart">
            <el-step title="prev_deploy" :status="stepStatus[0]"></el-step>
            <el-step title="deploy" :status="stepStatus[1]"></el-step>
            <el-step title="post_deploy" :status="stepStatus[2]"></el-step>
            <el-step title="prev_release" :status="stepStatus[3]"></el-step>
            <el-step title="release" :status="stepStatus[4]"></el-step>
            <el-step title="post_release" :status="stepStatus[5]"></el-step>
        </el-steps>
        <deploy-log :value="record" v-if="isStart"></deploy-log>
    </div>
</template>
<script>
import io from 'socket.io-client'
import DeployLog from './log.vue'
import {getTask} from '@/services/task.service'
// const STAGE = {
//   prev_deploy: 1,
//   deploy: 2,
//   post_deploy: 3,
//   prev_release: 4,
//   release: 5,
//   post_release: 6
// }
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
      isStart: false,
      noRun: false, // 是否可以点击开始上线
      setInterval: null,
      stepStatus: ['wait', 'wait', 'wait', 'wait', 'wait', 'wait']
    }
  },
  watch: {
    activeStep (val) {
      if (val === 0) {
        this.stepStatus = ['wait', 'wait', 'wait', 'wait', 'wait', 'wait']
      } else {
        const index = val - 1
        this.stepStatus = this.stepStatus.map((item, i) => {
          if (i < index) {
            return 'finish'
          } else if (i === index) {
            return 'process'
          } else {
            return item
          }
        })
      }
    }
  },
  created () {
    this.getTask()
  },
  destroyed () {
    clearInterval(this.setInterval)
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
      this.noRun = true
      this.activeStep = 0
      this.record = []
      this.websock.emit('deploy', {'task': this.taskId})
    },
    initWebSocket () { // 初始化weosocket
      const wsuri = `http://${location.host}/walle`
      this.websock = io.connect(wsuri, {
        reconnectionAttempts: 2
      })
      this.websock.on('connect', this.websocketonopen)
      // 2.返回construct, 初始化页面信息
      this.websock.on('construct', this.construct)
      // 3.发送deploy命令之后, 将会收到console
      this.websock.on('console', this.websocketonconsole)
      this.websock.on('fail', this.deployFail)
      this.websock.on('error', this.websocketonerror)
      this.websock.on('pong', (data) => {
        console.log('pong', data)
      })
    },
    construct ({data}) {
      console.log('construct', data)
      // 正在部署或已完成部署
      // 上线中，开始按钮不可点击，log显示
      if (parseInt(data.status) === 3) {
        this.isStart = true
        this.noRun = true
      } else if (parseInt(data.status) === 4 || parseInt(data.status) === 5) {
        // 4上线完成，5上线失败，开始按钮可点击，log显示
        this.noRun = false
        this.isStart = true
      } else if (parseInt(data.status) === 1) {
        // 审核通过，log不显示，按钮可点击
        this.noRun = false
        this.isStart = false
      } else {
        // 审核不通过，log不显示，按钮不可点击
        this.noRun = true
        this.isStart = false
      }
      this.websock.emit('logs', {'task': this.taskId})
      this.setInterval = setInterval(() => {
        const start = (new Date()).getTime()
        this.websock.emit('ping', {start_time: start})
        console.log('ping', start)
      }, 10000)
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      this.loading && this.loading.close()
      let actions = {'task': this.taskId}
      this.websock.emit('open', actions)
    },
    pong (data) {
      console.log('pong', data)
    },
    websocketonerror () { // 连接建立失败取消loading
      this.loading && this.loading.close()
    },
    websocketonconsole ({data}) { // 接收log
      console.log('console', data)
      this.record.push(data)
      if (data && data.sequence >= 0) {
        this.activeStep = data.sequence
      }
      if (data.status === 128) {
        this.deployFail()
      }
    },
    deployFail (data) {
      const msg = data && data.data ? data.data.message : ''
      if (msg) {
        this.$message.error(msg)
      }
      this.noRun = false
      this.isStart = true
      console.log(this.activeStep, this.activeStep - 1)
      this.stepStatus[this.activeStep - 1] = 'error'
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
