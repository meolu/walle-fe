export let API_HOST = '/api/'

export const ROLES = {
  SUPER: '超级管理员',
  OWNER: '空间所有者',
  MASTER: '项目管理员',
  DEVELOPER: '开发者',
  REPORTER: '访客'
}

export const ROLES_PROJECT = {
  MASTER: '项目管理员',
  DEVELOPER: '开发者',
  REPORTER: '访客'
}

export const defaultIcon = 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'

export const defaultRouteNoSpace = ['/', '/space/index', '/user/index', '/environment/index', '/server/index']
