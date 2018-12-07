<template>
    <div class="wl-task-log" ref="logBody">
        <div class="wl-task-log__body">
            <pre>
                <template v-for="(item,i) in value">
                    <div class="wl-task-log__line" :key="i+'command'" v-if="getLogCommand(item)">
                        <a></a>
                        <span class="command">{{`[${item.user}@${item.host}]$ ${getLogCommand(item)}`}}</span>
                    </div>
                    <div class="wl-task-log__line" v-for="(log,j) in transformStrToHtm(getLogContext(item))" :key="i+'log'+j" v-if="log">
                        <a></a>
                        <span :class="getLogClass(item)" v-html="log"></span>
                    </div>
                </template>
            </pre>
        </div>
    </div>
</template>

<script>
import {isObject} from '@/utils'
const AU = require('ansi_up')
const ansi_up = new AU.default() // eslint-disable-line

export default {
  name: 'deploy-log',
  props: {
    value: Array
  },
  watch: {
    value: {
      deep: true,
      handler () {
        this.$nextTick(() => {
          let logBody = this.$refs.logBody
          if (logBody) {
            let height = logBody.scrollHeight || 0
            logBody.scrollTo(0, height)
          }
        })
      }
    }
  },
  methods: {
    transformStrToHtm (str) {
      return ansi_up.ansi_to_html(str).split(/\r?\n/)
    },
    getLogClass (item) {
      if (item.status === 0) return 'success'
      else return 'error'
    },
    getLogContext (item) {
      if (item.status === 0) return item.success || ''
      else return item.error || ''
    },
    getLogCommand (item) {
      if (isObject(item)) {
        return item.cmd || ''
      } else {
        return item
      }
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(task-log) {
    flex-grow: 1;
    overflow: auto;

   @include e(body) {
      position: relative;

      pre {
        clear: left;
        min-height: 42px;
        padding: 15px 0;
        color: #f1f1f1;
        font-family: Cousine,monospace;
        font-size: 12px;
        line-height: 19px;
        white-space: normal;
        word-wrap: break-word;
        background-color: #222;
        counter-reset: line-numbering;
        margin-top: 0;
        margin-bottom: -45px;
      }
   }

   @include e(line) {
        position: relative;
        margin: 0 50px;
        min-height: 19px;
        white-space: normal;
        border-left: 1px solid #666;
        padding: 0 10px;

        a {
          display: inline-block;
          text-align: right;
          min-width: 50px;
          cursor: pointer;
          text-decoration: none;
          position: absolute;
          color: #666;
          top: 0;
          left: -50px;

          &::before {
            content: counter(line-numbering);
            counter-increment: line-numbering;
            padding-right: 1em;
          }
        }

        span {
          color: #B1FD79;
        }

        .error {
          color: #f00;
        }

        .success {
          color: #bbb;
        }
      }
}
</style>
