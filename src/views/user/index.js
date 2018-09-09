const List = () => import('./src/list/list.vue')
const Roles = () => import('./src/roles/roles.vue')
const Groups = () => import('./src/group/group.vue')
const GroupEdit = () => import('./src/group/group.edit.vue')
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
    path: '/user/group/create',
    name: 'GroupCreate',
    component: GroupEdit,
    props: true
  },
  {
    path: '/user/group/edit/:id',
    name: 'GroupEdit',
    component: GroupEdit,
    props: true
  },
  {
    path: '/user/roles',
    name: 'userRoles',
    component: Roles
  },
  {
    path: '/user/role/create',
    name: 'RoleCreate',
    component: RoleEdit,
    props: true
  },
  {
    path: '/user/role/edit/:id',
    name: 'RoleEdit',
    component: RoleEdit,
    props: true
  })
}
