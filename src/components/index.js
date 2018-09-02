import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const components = []

const ua = navigator.userAgent

const install = (Vue) => {
  Vue.use(ElementUI)

  components.forEach(component => {
    Vue.use(component)
  })

  // 是不是谷歌浏览器
  Vue.prototype.$isChrome = /chrome\/([\d/.]+)/i.test(ua)
}

export default {
  install
}
