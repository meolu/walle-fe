import { getUserMenu } from '@/services/user.service'
import {defaultRouteNoSpace} from '@/config/global.config'

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
    if (menu) {
      let except = defaultRouteNoSpace
      let spaceName = space.current.name || 'admain'
      const processMenu = function (menus) {
        menus.forEach(item => {
          if (item.url && except.indexOf(item.url) === -1) {
            item.url = `/${spaceName}${item.url}`
          }
          if (item.sub_menu && item.sub_menu.length > 0) {
            processMenu(item.sub_menu)
          }
        })
      }
      processMenu(menu)
    }
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
