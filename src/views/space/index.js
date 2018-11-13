const List = () => import('./src/space.list.vue')

export default function (router) {
  router.push({
    path: '/:space/space/index',
    name: 'spaceList',
    meta: {isMenu: true, menu: '/space/index'},
    component: List
  })
}
