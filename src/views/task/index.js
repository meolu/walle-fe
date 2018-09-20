const List = () => import('./src/task/list.vue')

export default function (router) {
  router.push({
    path: '/task/list',
    name: 'taskList',
    meta: {isMenu: true},
    component: List
  })
}
