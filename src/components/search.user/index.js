import SearchUser from './src/search.user.vue'

SearchUser.install = function (Vue) {
  Vue.component(SearchUser.name, SearchUser)
}

export default SearchUser
