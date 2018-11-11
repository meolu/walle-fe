// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import component from './components'
import RouterConfig from './config/router.config'
import store from './stores'
import router from './router'

Vue.config.productionTip = false

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
