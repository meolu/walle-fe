const Home = () => import('./src/home.vue')

export default function (router) {
  router.push({
    path: '/',
    name: 'Home',
    meta: {isMenu: true},
    component: Home
  })
}
