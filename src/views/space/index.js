const List = () => import('./src/space.list.vue')

export default function (router) {
  router.push({
    path: '/space/list',
    name: 'spaceList',
    meta: {isMenu: true},
    component: List
  })
}
