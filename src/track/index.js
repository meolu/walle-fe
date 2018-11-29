import Track from './track'
import TrackEvent from './trackEvent'

export default {
  install (Vue, { router }) {
    const track = new Track(router)

    Vue.$rrcTrack = track
    Vue.prototype.$rrcTrack = track

    Vue.use(TrackEvent)
  }
}
