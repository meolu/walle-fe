import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Table from './table'
import Breadcrumb from './breadcrumb'

const components = [
  Table,
  Breadcrumb
]

const ua = navigator.userAgent
// console.log(ElementUI)

const install = (Vue) => {
  Vue.use(ElementUI)

  Vue.$loading = Vue.prototype.$loading = ElementUI.Loading.service

  components.forEach(component => {
    Vue.use(component)
  })

  // 是不是谷歌浏览器
  Vue.prototype.$isChrome = /chrome\/([\d/.]+)/i.test(ua)
}

export default {
  install
}
