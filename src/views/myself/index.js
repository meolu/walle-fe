import About from './src/about.vue'

export default function (router) {
  router.push({
    path: '/about',
    name: 'About',
    component: About
  })
}
