import wlContent from './src/content.vue'

wlContent.install = function (Vue) {
  Vue.component(wlContent.name, wlContent)
}

export default wlContent
