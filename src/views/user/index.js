const List = () => import('./src/list/list.vue')
const Roles = () => import('./src/roles/roles.vue')
const Groups = () => import('./src/group/group.vue')
const RoleEdit = () => import('./src/roles/role.edit.vue')

export default function (router) {
  router.push({
    path: '/user/list',
    name: 'userList',
    component: List
  },
  {
    path: '/user/groups',
    name: 'userGroups',
    component: Groups
  },
  {
    path: '/user/roles',
    name: 'userRoles',
    component: Roles
  },
  {
    path: '/user/roles/create',
    name: 'RoleCreate',
    component: RoleEdit,
    props: true
  },
  {
    path: '/user/roles/edit/:id',
    name: 'RoleEdit',
    component: RoleEdit,
    props: true
  })
}
