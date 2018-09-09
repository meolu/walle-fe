import { getUserMenu } from '@/services/user.service'

const state = {
  user: null,
  menu: null
}

const getters = {
  userName ({ user }) {
    return user.name
  }
}

const mutations = {
  FETCH_USER_INFO (state, {user, menu}) {
    state.user = user
    state.menu = menu
  }
}

const actions = {
  async FETCH_USER_INFO ({ commit }) {
    let user = null
    try {
      const { data } = await getUserMenu()
      user = data
    } catch (err) {}
    commit('FETCH_USER_INFO', user)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
