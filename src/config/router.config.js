/**
 * @export
 * @param {any} router 路由
 * @param {any} store vuex store
 */
export default function RouterConfig(router, {getters,dispatch}) { // eslint-disable-line
  router.beforeEach(async (to, from, next) => {
    let { path, meta, params } = to // eslint-disable-line
    if (params.space) {
      if (!getters.user) {
        await dispatch('FETCH_USER_INFO')
      }
      let space = getters.spaceName
      if (space !== params.space) {
        next('/')
      }
    }
    if (/^http/.test(path)) {
      let url = path.split('http')[1]
      window.location.href = `http${url}`
    } else {
      next()
    }
  })
}
