import AddMembers from './src/add.members.vue'

AddMembers.install = function (Vue) {
  Vue.component(AddMembers.name, AddMembers)
}

export default AddMembers
