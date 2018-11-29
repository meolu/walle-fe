const qrcodeHander = '@@rcTrack'
/**
 * 绑定发送百度统计指令
 */
export default {
  bind (el, binding, vnode) {
    const vm = vnode.context
    const value = binding.value
    const hannder = async () => {
      vm.$rrcTrack.trackEvent(value)
    }
    vm.$nextTick(() => {
      el[qrcodeHander] = {
        hannder,
        vm: vm
      }
      el.addEventListener('click', el[qrcodeHander].hannder)
    })
  },
  unbind (el) {
    el[qrcodeHander].hannder && el.removeEventListener('click', el[qrcodeHander].hannder)
  },
  install (Vue) {
    Vue.directive('rcTrack', {
      bind: this.bind,
      unbind: this.unbind
    })
  }
}
