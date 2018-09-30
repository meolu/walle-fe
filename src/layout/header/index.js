import wlHeader from './src/header.vue'

wlHeader.install = function (Vue) {
  Vue.component(wlHeader.name, wlHeader)
}

export default wlHeader
