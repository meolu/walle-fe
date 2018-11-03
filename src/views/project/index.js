const Project = () => import('./src/project/project.vue')
const ProjectEdit = () => import('./src/project/project.edit.vue')
const Server = () => import('./src/server/server.vue')
const Environment = () => import('./src/environment/environment.vue')
const ProjectMembers = () => import('./src/project/members.vue')

export default function (router) {
  router.push({
    path: '/project/index',
    name: 'projectList',
    meta: {isMenu: true},
    component: Project
  },
  {
    path: '/project/create',
    name: 'ProjectCreate',
    component: ProjectEdit,
    meta: {isMenu: true, menu: '/project/index'},
    props: true
  },
  {
    path: '/project/edit/:id',
    name: 'ProjectEdit',
    meta: {isMenu: true, menu: '/project/index'},
    component: ProjectEdit,
    props: true
  },
  {
    path: '/project/members/:id',
    name: 'ProjectMembers',
    meta: {isMenu: true, menu: '/project/index'},
    component: ProjectMembers,
    props: true
  },
  {
    path: '/server/index',
    name: 'Server',
    meta: {isMenu: true},
    component: Server
  },
  {
    path: '/environment/index',
    name: 'Environment',
    meta: {isMenu: true},
    component: Environment
  })
}
