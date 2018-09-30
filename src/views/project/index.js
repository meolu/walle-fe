const Project = () => import('./src/project/project.vue')
const ProjectEdit = () => import('./src/project/project.edit.vue')
const Server = () => import('./src/server/server.vue')
const Environment = () => import('./src/environment/environment.vue')

export default function (router) {
  router.push({
    path: '/project/list',
    name: 'projectList',
    meta: {isMenu: true},
    component: Project
  },
  {
    path: '/project/create',
    name: 'ProjectCreate',
    component: ProjectEdit,
    meta: {isMenu: true, menu: '/project/list'},
    props: true
  },
  {
    path: '/project/edit/:id',
    name: 'ProjectEdit',
    meta: {isMenu: true, menu: '/project/list'},
    component: ProjectEdit,
    props: true
  },
  {
    path: '/project/server',
    name: 'Server',
    meta: {isMenu: true},
    component: Server
  },
  {
    path: '/project/environment',
    name: 'Environment',
    meta: {isMenu: true},
    component: Environment
  })
}
