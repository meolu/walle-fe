const List = () => import('./src/space.list.vue')

export default function (router) {
  router.push({
    path: '/space/index',
    name: 'spaceList',
    meta: {isMenu: true},
    component: List
  })
}
