<template>
    <div class="wl-task-deploy">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <div class="wl-task-deploy__header" v-if="task">
          <span class="title">{{task.project_name}}</span><span class="title">/</span><span class="title">{{task.name}}</span>
           <el-button type="success" size="small" @click="start" :disabled="noRun">开始</el-button>
        </div>
        <wl-steps v-for="(server, i) in servers" :key="server.host" v-if="isStart">
            <wl-step title="Deploy前置任务" :status="status[server.host][0]" :showTitle="i===0" :hidden="i!==0"></wl-step>
            <wl-step title="Deploy" :status="status[server.host][1]" :showTitle="i===0" :hidden="i!==0"></wl-step>
            <wl-step title="Deploy后置任务" :status="status[server.host][2]" :showTitle="i===0" :hidden="i!==0">
              <div class="wl-task-deploy__host">{{server.host}}</div>
            </wl-step>
            <wl-step title="Release前置任务" :status="status[server.host][3]" :showTitle="i===0"></wl-step>
            <wl-step title="Release" :status="status[server.host][4]" :showTitle="i===0"></wl-step>
            <wl-step title="Release后置任务" :status="status[server.host][5]" :showTitle="i===0"></wl-step>
        </wl-steps>
        <deploy-log :value="record" v-if="isStart"></deploy-log>
    </div>
</template>
<script>
import io from 'socket.io-client'
import DeployLog from './log.vue'
import {getTask} from '@/services/task.service'
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
      stepStatus: ['wait', 'wait', 'wait', 'wait', 'wait', 'wait'],
      servers: [],
      // servers: [{name: 'dev-lizhijie', host: '172.20.95.43'}, {name: 'desdfe', host: '172.20.95.13'}, {name: 'desdfklhijie', host: '172.20.0.43'}],
      status: {},
      active: {},
      currentHost: ''
    }
  },
  watch: {
    active: {
      deep: true,
      handler () {
        console.log('active', this.active, this.status)
        for (let key in this.active) {
          let val = this.active[key]
          if (val === 0) {
            this.$set(this.status, key, ['wait', 'wait', 'wait', 'wait', 'wait', 'wait'])
          } else {
            const index = val - 1
            this.$set(this.status, key, this.status[key].map((item, i) => {
              if (i < index) {
                return 'finish'
              } else if (i === index) {
                return 'process'
              } else {
                return item
              }
            }))
          }
        }
      }
    }
  },
  created () {
    this.getTask()
    // this.processData(this.servers)
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
      for (let key in this.active) {
        this.active[key] = 0
      }
      this.record = []
      this.websock.emit('deploy', {'task': this.taskId})
    },
    processData (servers) {
      this.servers = servers
      this.currentHost = servers[0].host
      servers.map(item => {
        // this.active[item.host] = 0
        this.$set(this.active, item.host, 0)
        // this.status[item.host] = ['wait', 'wait', 'wait', 'wait', 'wait', 'wait']
      })
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
      this.websock.on('success', this.deploySuccess)
      this.websock.on('error', this.websocketonerror)
      this.websock.on('pong', (data) => {
        console.log('pong', data)
      })
    },
    construct ({data}) {
      console.log('construct', data)
      this.processData(data.servers_info)
      // 正在部署或已完成部署
      // 上线中，4上线完成，开始按钮不可点击，log显示
      if (parseInt(data.status) === 3 || parseInt(data.status) === 4) {
        this.isStart = true
        this.noRun = true
      } else if (parseInt(data.status) === 5) {
        // 5上线失败，开始按钮可点击，log显示
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
    websocketonconsole (data) { // 接收log
      console.log('console', data)
      const log = data.data
      this.record.push(log)
      let isHas = this.status[log.host]
      if (log && log.sequence > 0) {
        let host = isHas ? log.host : this.currentHost
        this.$set(this.active, host, log.sequence)
      }
      this.currentHost = isHas ? log.host : this.currentHost
    },
    deployFail (data) {
      console.log('fail', data)
      if (this.isStart) {
        const msg = data && data.data ? data.data.message : ''
        if (msg && (this.task.status !== 4 && this.task.status !== 5)) {
          this.$message.error(msg)
        }
        this.noRun = false
        this.isStart = true
        const step = this.active[this.currentHost] === 0 ? 0 : this.active[this.currentHost] - 1
        this.$set(this.status[this.currentHost], step, 'error')
      }
    },
    deploySuccess (data) {
      console.log('sucess', data)
      if (this.isStart) {
        const msg = data && data.data ? data.data.message : ''
        if (msg && (this.task.status !== 4 && this.task.status !== 5)) {
          this.$message.success(msg)
        }
        this.noRun = true
        this.isStart = true
        for (let key in this.active) {
          this.$set(this.active, key, 7)
        }
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

   .wl-steps {
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

   .wl-task-deploy__host {
      position: absolute;
      bottom: 7px;
      right: 5px;
      color: #666;
   }
}
</style>
