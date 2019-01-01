<template>
    <svg class="wl-svg-tree" :width="size.width" :height="size.height+offset">
        <g>
            <text v-for="item in titles" :key="item.text" :x="item.x" :y="item.y" class="title">{{item.text}}</text>
        </g>
        <g :transform="`translate(0,${offset})`">
            <g v-for="(node,i) in nodes" :key="node.name+i" :class="node.status">
                 <line v-if="node.parent" :x1="node.parent.x+r+2" :y1="node.parent.y" :x2="node.x" :y2="node.y"/>
                 <circle :cx="node.x" :cy="node.y" :r="r"/>
                 <circle v-if="node.status==='process'" :cx="node.x" :cy="node.y+r" r="3" style="stroke: none; fill:#303133;">
                      <animateTransform
                        attributeName="transform"
                        begin="0s"
                        dur="3s"
                        :from="`0, ${node.x}, ${node.y}`"
                        :to="`360, ${node.x}, ${node.y}`"
                        type="rotate"
                        repeatCount="indefinite"
                    />
                 </circle>
                 <text :x="node.x-3" :y="node.y+4">{{node.status === 'error'? 'X' : node.name}}</text>
                 <text v-if="node.isLeaf" :x="node.x+20" :y="node.y+4">{{node.host}}</text>
            </g>
        </g>
    </svg>
</template>

<script>
const ITEM_HEIGHT = 34
const TITLE_HEIGHT = 40
const NODE_R = 12
export default {
  name: 'wl-tree',
  props: {
    steps: {
      type: Array,
      default: () => {
        return ['Deploy前置任务', 'Deploy', 'Deploy后置任务', 'Release前置任务', 'Release', 'Release后置任务']
      }
    },
    width: Number,
    servers: Array,
    status: Object
  },
  data () {
    return {
      data: null,
      r: NODE_R,
      offset: TITLE_HEIGHT
    }
  },
  watch: {
    status: {
      deep: true,
      handler () {
        this.data = this.getData()
      }
    }
  },
  computed: {
    size () {
      let l = this.servers.length
      return {
        width: this.width,
        height: ITEM_HEIGHT * l
      }
    },
    step () {
      let l = this.steps.length
      let step = (this.size.width - 130) / (l - 1)
      return step
    },
    titles () {
      const {step} = this
      return this.steps.map((item, i) => {
        return {
          x: step * i,
          y: 18,
          text: item
        }
      })
    },
    nodes () {
      if (!this.data) return []
      return this.process([this.data])
    }
  },
  methods: {
    process (data, parent) {
      let result = []
      return data.reduce((total, current) => {
        const {children} = current
        if (children) {
          total.push({
            name: current.name,
            depth: current.depth,
            status: current.status,
            host: current.host,
            x: current.x,
            y: current.y,
            parent: parent
          })
          let ff = this.process(children, {
            x: current.x,
            y: current.y
          })
          return [].concat(total, ff)
        } else {
          total.push({
            name: current.name,
            depth: current.depth,
            status: current.status,
            host: current.host,
            x: current.x,
            y: current.y,
            parent: parent,
            isLeaf: true
          })
          return total
        }
      }, result)
    },
    getData () {
      const {status, size, step} = this
      let children = []
      let main = this.servers[0]
      if (!status[main.host]) return null
      let result = {
        name: 1,
        depth: 0,
        status: status[main.host][0],
        host: main.host,
        x: 15 + step * 0,
        y: (size.height - ITEM_HEIGHT) / 2,
        children: [
          {
            name: 2,
            depth: 1,
            status: status[main.host][1],
            host: main.host,
            x: step * 1,
            y: (size.height - ITEM_HEIGHT) / 2,
            children: [
              {
                name: 3,
                depth: 2,
                status: status[main.host][2],
                host: main.host,
                x: step * 2,
                y: (size.height - ITEM_HEIGHT) / 2,
                children: children
              }
            ]
          }
        ]
      }
      this.servers.map((item, i) => {
        children.push({
          name: 4,
          depth: 3,
          status: status[item.host][3],
          host: item.host,
          x: step * 3,
          y: ITEM_HEIGHT * i,
          children: [
            {
              name: 5,
              depth: 4,
              status: status[item.host][4],
              host: item.host,
              x: step * 4,
              y: ITEM_HEIGHT * i,
              children: [
                {
                  name: 6,
                  depth: 5,
                  status: status[item.host][5],
                  host: item.host,
                  x: step * 5,
                  y: ITEM_HEIGHT * i,
                  children: null
                }
              ]
            }
          ]
        })
      })
      return result
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(svg-tree) {
    .title {
        fill: #409eff;
        font-size: 16px;
    }

    .wait {
        line {
            stroke:#c0c4cc;
            stroke-width: 2px;
        }

        circle {
            stroke:#c0c4cc;
            stroke-width: 2px;
            fill: #fff;
        }

        text {
            fill: #c0c4cc;
        }
    }

    .finish {
        line {
            stroke:#409eff;
            stroke-width: 2px;
        }

        circle {
            stroke:#409eff;
            stroke-width: 2px;
            fill: #fff;
        }

        text {
            fill: #409eff;
        }
    }

    .process {
        line {
            stroke:#c0c4cc;
            stroke-width: 2px;
        }

        circle {
            stroke:#303133;
            stroke-width: 2px;
            fill: #fff;
        }

        text {
            fill: #303133;
        }
    }

    .error {
        line {
            stroke:#c0c4cc;
            stroke-width: 2px;
        }

        circle {
            stroke:#f56c6c;
            stroke-width: 2px;
            fill: #fff;
        }

        text {
            fill: #f56c6c;
        }
    }
}
</style>
