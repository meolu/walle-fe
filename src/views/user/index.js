const User = () => import('./src/user.vue')

export default function (router) {
  router.push({
    path: '/user/list',
    name: 'user',
    component: User
  })
}
