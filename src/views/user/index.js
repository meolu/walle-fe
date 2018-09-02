const List = () => import('./src/list/list.vue')
const Roles = () => import('./src/roles/roles.vue')

export default function (router) {
  router.push({
    path: '/user/list',
    name: 'userList',
    component: List
  },
  {
    path: '/user/roles',
    name: 'userRoles',
    component: Roles
  })
}
