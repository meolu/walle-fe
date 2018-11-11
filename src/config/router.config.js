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
    if (/^http/.test(path)) {
      let url = path.split('http')[1]
      window.location.href = `http${url}`
    } else {
      next()
    }
  })
}
