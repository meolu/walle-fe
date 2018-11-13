const List = () => import('./src/list/list.vue')
// const Roles = () => import('./src/roles/roles.vue')
// const Groups = () => import('./src/group/group.vue')
// const GroupEdit = () => import('./src/group/group.edit.vue')
// const RoleEdit = () => import('./src/roles/role.edit.vue')

export default function (router) {
  router.push({
    path: '/:space/user/index',
    name: 'userList',
    meta: {isMenu: true, menu: '/user/index'},
    component: List
  }
  // {
  //   path: '/user/groups',
  //   name: 'userGroups',
  //   meta: {isMenu: true},
  //   component: Groups
  // },
  // {
  //   path: '/user/group/create',
  //   name: 'GroupCreate',
  //   component: GroupEdit,
  //   meta: {isMenu: true, menu: '/user/groups'},
  //   props: true
  // },
  // {
  //   path: '/user/group/edit/:id',
  //   name: 'GroupEdit',
  //   meta: {isMenu: true, menu: '/user/groups'},
  //   component: GroupEdit,
  //   props: true
  // }
  // {
  //   path: '/user/roles',
  //   name: 'userRoles',
  //   meta: {isMenu: true},
  //   component: Roles
  // },
  // {
  //   path: '/user/role/create',
  //   name: 'RoleCreate',
  //   component: RoleEdit,
  //   meta: {isMenu: true, menu: '/user/roles'},
  //   props: true
  // },
  // {
  //   path: '/user/role/edit/:id',
  //   name: 'RoleEdit',
  //   component: RoleEdit,
  //   meta: {isMenu: true, menu: '/user/roles'},
  //   props: true
  // }
  )
}
