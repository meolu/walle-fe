// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import component from './components'
import RouterConfig from './config/router.config'
import store from './stores'
import router from './router'
import track from './track'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
// 百度统计
  Vue.use(track, { router })
}

Vue.use(component)

// router 处理
RouterConfig(router, store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
