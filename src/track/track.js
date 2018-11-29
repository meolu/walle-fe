import {getCookie, setCookie} from '@/utils/cookies'

const cookieName = 'LSJNHSTWBSODS67N'
export default class Track {
  constructor (router) {
    this.trackPageview(router)
  }

  /**
   * 监听路由跳转后，发送PV统计
   * @param {Object} router
   */
  trackPageview (router) {
    router.afterEach(to => {
      const hours = (new Date()).getHours()
      if (hours === 20 && !getCookie(cookieName) && to.name === 'TaskDeploy') {
        window._hmt.push(['_trackPageview', to.fullPath])
        let date21 = new Date()
        date21.setHours(21)
        date21.setMinutes(0)
        date21.setSeconds(0)
        const time = date21 - (new Date())
        setCookie(cookieName, true, time)
      }
    })
  }

  /**
   * 触发事件，发送事件统计
   */
  trackEvent ({ category, action, optLabel, optValue } = {}) {
    window._hmt.push(['_trackEvent', category, action, optLabel, optValue])
  }
}
