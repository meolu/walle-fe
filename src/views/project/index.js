const Project = () => import('./src/project/project.vue')
const ProjectEdit = () => import('./src/project/project.edit.vue')
const Server = () => import('./src/server/server.vue')
const Environment = () => import('./src/environment/environment.vue')
const ProjectMembers = () => import('./src/project/members.vue')

export default function (router) {
  router.push({
    path: '/:space/project/index',
    name: 'projectList',
    meta: {isMenu: true, menu: '/project/index'},
    component: Project
  },
  {
    path: '/:space/project/create',
    name: 'ProjectCreate',
    component: ProjectEdit,
    meta: {isMenu: true, menu: '/project/index'},
    props: true
  },
  {
    path: '/:space/project/edit/:id',
    name: 'ProjectEdit',
    meta: {isMenu: true, menu: '/project/index'},
    component: ProjectEdit,
    props: true
  },
  {
    path: '/:space/project/members/:id',
    name: 'ProjectMembers',
    meta: {isMenu: true, menu: '/project/index'},
    component: ProjectMembers,
    props: true
  },
  {
    path: '/:space/server/index',
    name: 'Server',
    meta: {isMenu: true, menu: '/server/index'},
    component: Server
  },
  {
    path: '/:space/environment/index',
    name: 'Environment',
    meta: {isMenu: true, menu: '/environment/index'},
    component: Environment
  })
}
