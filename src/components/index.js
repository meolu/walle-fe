import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Table from './table'
import Breadcrumb from './breadcrumb'
import Split from './split'
import FullScreen from './fullscreen'
import AddMember from './add.member'
import SearchUser from './search.user'
import Transfer from './transfer'

const components = [
  Table,
  Breadcrumb,
  Split,
  FullScreen,
  AddMember,
  SearchUser,
  Transfer
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
