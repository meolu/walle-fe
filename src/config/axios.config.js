import Vue from 'vue'
import axios from 'axios'
import { isUndefined } from '@/utils'

/**
 * 请求配置
 * @see https://github.com/mzabriskie/axios
 */
const service = axios.create({
  timeout: 40000,
  withCredentials: true
})
// loading 组
let ARR_LOADING = []
let IS_LOADING = false
let LOADING_INSTANCE = null
service.interceptors.request.use(config => {
  if (config.isLoading) {
    ARR_LOADING.push(config.url)
    if (!IS_LOADING) {
      IS_LOADING = true
      let loadingConfig = {
        text: config.text || '努力加载中...'
      }
      if (config.target) {
        loadingConfig.target = config.target
      }
      LOADING_INSTANCE = Vue.$loading(loadingConfig)
    }
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    let { data: { code, message, data }, config } = response
    if (config.isLoading) {
      let index = ARR_LOADING.indexOf(config.url)
      ARR_LOADING.splice(index, 1)
      if (LOADING_INSTANCE && ARR_LOADING.length === 0) {
        LOADING_INSTANCE.close()
        LOADING_INSTANCE = null
        IS_LOADING = false
      }
    }
    // 如果不是code 返回值
    if (isUndefined(code)) {
      return response.data
    }
    if (code !== 0) {
      if (code === 1000) {
        window.location.href = `/login`
      } else {
        // 是否自动提示消息
        if (config.isAutoMsg) {
          Vue.prototype.$notify.error({
            title: `${config.messageTitle || ''}`,
            message: `${config.messagePrefix || ''}${message}`
          })
        }
      }
      return Promise.reject({ code, data, message }) // eslint-disable-line
    } else {
      return response.data
    }
  },
  error => {
    ARR_LOADING = []
    if (LOADING_INSTANCE) {
      LOADING_INSTANCE.close()
      LOADING_INSTANCE = null
    }

    IS_LOADING = false
    let response = error.response
    if (response.status === 404 || response.status.toString().indexOf('50') === 0) {
      Vue.prototype.$notify.error({
        title: '后台服务未启动',
        message: '请检查日志或者点官网链接查看帮助'
      })
      return Promise.reject(error)
    }
    if (response === undefined) {
      Vue.prototype.$notify.error({
        title: '操作提示',
        message: '网络异常, 请刷新重试'
      })
      return Promise.reject(error)
    }
    Vue.prototype.$notify.error({
      title: '操作提示',
      message: '网络异常, 请刷新重试'
    })
    return Promise.reject(error)
  }
)

export default service
