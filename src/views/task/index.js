const List = () => import('./src/task/list.vue')
const TaskEdit = () => import('./src/task/task.edit.vue')
const TaskCreate = () => import('./src/task/task.create.vue')

export default function (router) {
  router.push({
    path: '/task/list',
    name: 'taskList',
    meta: {isMenu: true},
    component: List
  },
  {
    path: '/task/edit',
    name: 'TaskEdit',
    component: TaskEdit,
    meta: {isMenu: true, menu: '/task/list'},
    props: true
  },
  {
    path: '/task/edit/:id',
    name: 'TaskEdit',
    component: TaskEdit,
    meta: {isMenu: true, menu: '/task/list'},
    props: true
  },
  {
    path: '/task/create',
    name: 'TaskCreate',
    meta: {isMenu: true, menu: '/task/list'},
    component: TaskCreate,
    props: true
  })
}
