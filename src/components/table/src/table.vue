<script>
import { isFunction } from '@/utils'

function copy (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  let newObj = {}
  for (let key in obj) {
    newObj[key] = copy(obj[key])
  }
  return newObj
}
export default {
  name: 'wl-table',
  data () {
    return {
      list: [],
      // 表格
      page: {
        // 总数
        total: 0,
        // 当前选择
        currentPage: 1,
        size: 10
      },
      // 排序
      sort: {
        prop: '',
        order: ''
      }
    }
  },
  props: {
    // 是否自动进行数据获取 有些情况下 不
    isReload: {
      type: Boolean,
      default: true
    },
    // 表单的展现形式
    inline: {
      type: Boolean,
      default: true
    },
    formSize: {
      type: String,
      default: 'small'
    },
    // 是否有分页显示
    isPage: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 50, 100, 150]
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next'
    },
    // 表单数据
    form: {
      type: Object
    },
    // 表单验证
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    // 表格列
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    // 事件监听
    onTable: {
      type: Object,
      default () {
        return {}
      }
    },
    // 表格属性
    elAttr: {
      type: Object,
      default () {
        return {}
      }
    },
    // 表格样式
    tbClass: {
      type: Object,
      default () {
        return {}
      }
    },
    // style
    tbStyle: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    this.page.size = this.pageSize
    if (this.isReload) {
      this.$emit('callServe', this)
    }
  },
  methods: {
    // 渲染表单
    renderForm(h) { //eslint-disable-line
      return (
        <el-form ref="form" inline={this.inline} model={this.form} rules={this.rules} size={this.formSize}>
          {this.$slots.form}
        </el-form>
      )
    },
    // 渲染分页
    renderPage(h) { // eslint-disable-line
      return (
        <el-pagination
          class="wl-table__page"
          background
          current-page={this.page.currentPage}
          page-sizes={this.pageSizes}
          page-size={this.pageSize}
          layout={this.pageLayout}
          total={this.page.total}
          on-size-change={this.sizeChange}
          on-current-change={this.currentChange}>
        </el-pagination>
      )
    },
    // 搜索使用
    search () {
      this.$refs.form.validate((valid) => {
        // 校验失败
        if (!valid) {
          return false
        }
        this.page.currentPage = 1
        this.$emit('callServe', this)
      })
    },
    // 刷新 没有表单时使用
    refresh () {
      this.page.currentPage = 1
      this.$emit('callServe', this)
    },
    // 使用js 数据渲染表格列
    renderColumns(h) { // eslint-disable-line
      let renders = this._l(this.columns, item => {
        return this.renderColumn(h, item)
      })
      return renders
    },
    // 渲染单列
    renderColumn (h, item) {
      let render = item.render
      switch (true) {
        case isFunction(render):
          // 处理方法
          let methods = item.methods || {}
          let props = copy(item)
          delete props.render
          delete props.methods
          // @see https://stackoverflow.com/questions/43702591/how-to-use-template-scope-in-vue-jsx
          return (
            <el-table-column {...this._renderColumnProps(props)} scopedSlots={
              {
                default: scope => {
                  return render(h, scope, methods)
                }
              }
            }>
            </el-table-column>
          )
        default:
          return (
            <el-table-column {...this._renderColumnProps(item)}>
            </el-table-column>
          )
      }
    },
    // 重置列属性让 vue jsx 能识别
    _renderColumnProps (props) {
      return {
        props: {
          ...props
        }
      }
    },
    // 表单清空
    resetFields () {
      this.$refs.form.resetFields()
    },
    // 页面改变
    currentChange (currentPage) {
      this.page.currentPage = currentPage
      this.$emit('callServe', this)
    },
    // 显示多少页改变
    sizeChange (size) {
      this.page.size = size
      // 改变pageSize时也应该回到第一页，避免pageSize太大导致当前页数据为空
      this.page.currentPage = 1
      this.$emit('callServe', this)
    },
    // 排序change
    sortChange ({ prop, order }) {
      this.sort.prop = prop
      this.sort.order = order
      this.$emit('callServe', this)
    },
    // 暴露表格对象
    $table () {
      return this.$refs.table
    }
  },
  render (h) {
    let data = {
      props: {
        ...this.elAttr
      },
      on: {
        ...this.onTable
      },
      class: {
        ...this.tbClass
      },
      style: {
        ...this.tbStyle
      }
    }
    return (
      <div class="wl-table">
        {
          this.$slots.form && this.renderForm(h)
        }
        <el-table ref="table" data={this.list} style="width: 100%;" size="mini" on-sort-change={this.sortChange} {...data}>
          {
            this.columns.length > 0 ? this.renderColumns(h) : this.$slots.default
          }
        </el-table>
        {
          this.isPage && this.renderPage(h)
        }
      </div>
    )
  }
}
</script>

<style lang="scss" src="./table.scss"></style>
