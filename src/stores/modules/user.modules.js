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
  },
  spaceName ({space, user}) {
    if (user) {
      return space && space.current && space.current.name ? space.current.name : 'admin'
    }
    return null
  }
}

const mutations = {
  SET_USER_INFO (state, {user, space, menu} = {}) {
    state.user = user
    state.space = space
    state.menu = menu
  }
}

const actions = {
  async FETCH_USER_INFO ({ commit }) {
    try {
      const { data } = await getUserMenu()
      commit('SET_USER_INFO', data)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
