const List = () => import('./src/task/list.vue')
const TaskEdit = () => import('./src/task/task.edit.vue')
const TaskCreate = () => import('./src/task/task.create.vue')
const TaskDeploy = () => import('./src/task/deploy.task.vue')

export default function (router) {
  router.push({
    path: '/:space/deploy/index',
    name: 'taskList',
    meta: {isMenu: true, menu: '/deploy/index'},
    component: List,
    props: true
  },
  {
    path: '/:space/task/edit',
    name: 'TaskEdit',
    component: TaskEdit,
    meta: {isMenu: true, menu: '/deploy/index'},
    props: true
  },
  {
    path: '/:space/task/edit/:taskId',
    name: 'TaskEditOfTask',
    component: TaskEdit,
    meta: {isMenu: true, menu: '/deploy/index'},
    props: true
  },
  {
    path: '/:space/task/create',
    name: 'TaskCreate',
    meta: {isMenu: true, menu: '/deploy/index'},
    component: TaskCreate,
    props: true
  },
  {
    path: '/:space/task/create/:projectId',
    name: 'TaskCreateOfProject',
    meta: {isMenu: true, menu: '/deploy/index'},
    component: TaskEdit,
    props: true
  },
  {
    path: '/:space/task/deploy/:taskId',
    name: 'TaskDeploy',
    meta: {isMenu: true, menu: '/deploy/index'},
    component: TaskDeploy,
    props: true
  })
}
