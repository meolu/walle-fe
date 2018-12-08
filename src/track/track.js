import {getCookie, setCookie, delCookieOf} from '@/utils/cookies'

const cookieName = 'LSJNHSTWBSODS67N'
export default class Track {
  constructor (router) {
    this.init(router)
    this.trackPageview(router)
  }

  init (router) {
    this.router = router
  }

  /**
   * 监听路由跳转后，发送PV统计
   * @param {Object} router
   */
  trackPageview (router) {
    // router.beforeEach((to, from, next) => {
    //   const hours = (new Date()).getHours()
    //   if (hours === 20 && !getCookie(cookieName) && to.name === 'TaskDeploy') {
    //     import('./baidu.js').then(() => {
    //       let date21 = new Date()
    //       date21.setHours(21)
    //       date21.setMinutes(0)
    //       date21.setSeconds(0)
    //       const time = date21 - (new Date())
    //       setCookie(cookieName, true, time)
    //       window._hmt.push(['_trackPageview', to.fullPath])
    //       // location.reload()
    //       location.replace(to.fullPath)
    //     })
    //   }
    //   next()
    // })
    router.afterEach((to, from) => {
      delCookieOf(['Hm_lpvt_2ef62756e9f3268b17d316a6f6f5a4a0', 'Hm_lvt_2ef62756e9f3268b17d316a6f6f5a4a0'])
    })
  }

  /**
   * 触发事件，发送事件统计
   */
  trackEvent ({ category, action, optLabel, optValue } = {}, path) {
    const hours = (new Date()).getHours()
    if (hours === 20 && !getCookie(cookieName)) {
      import('./baidu.js').then(() => {
        let date21 = new Date()
        date21.setHours(21)
        date21.setMinutes(0)
        date21.setSeconds(0)
        const time = date21 - (new Date())
        setCookie(cookieName, true, time, '/')
        window._hmt.push(['_trackEvent', category, action, optLabel, optValue])
        location.replace(path)
      })
    } else {
      this.router.push(path)
    }
  }
}
