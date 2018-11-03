/**
 * @export
 * @param {any} router 路由
 * @param {any} store vuex store
 */
export default function RouterConfig(router, store) { // eslint-disable-line
  router.beforeEach(async (to, from, next) => {
    let { name, matched, fullPath, path } = to // eslint-disable-line
    if (to.hash) {
      return
    }
    // 处理用户信息
    // if (matched.some(record => record.meta.requiresAuth) && 1 !== 2) {
    //   let isLoggedIn = !Vue.cookie.get('uid') || !Vue.cookie.get('token')
    //   if (isLoggedIn) {
    //     next({
    //       path: '/login',
    //       query: { redirect: fullPath }
    //     })
    //     return
    //   }
    // }

    if (/^http/.test(path)) {
      let url = path.split('http')[1]
      window.location.href = `http${url}`
    } else {
      next()
    }
  })
}
