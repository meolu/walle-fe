import { getUserMenu } from '@/services/user.service'

const state = {
  user: null,
  menu: null,
  space: null
}

const getters = {
  user ({ user }) {
    return user
  },
  space ({space}) {
    return space
  },
  menu ({menu}) {
    return menu
  }
}

const mutations = {
  SET_USER_INFO (state, {user, space, menu}) {
    state.user = user
    state.menu = menu
    state.space = space
  }
}

const actions = {
  async FETCH_USER_INFO ({ commit }) {
    // try {
    const { data } = await getUserMenu()
    // } catch (err) {}
    commit('SET_USER_INFO', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
