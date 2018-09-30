// import {statusDefine} from '../constant'
export default function () {
  const self = this
  return [
    {
      label: '用户名',
      width: 250,
      prop: 'username'
    },
    {
      label: '角色',
      width: 250,
      prop: 'role_name'
      // render (h, scope, methods) {
      //   return scope.row.role_name
      //   // return roleDefine[scope.row.role].name
      // }
    },
    {
      label: '状态',
      width: 250,
      prop: 'status'
      // render (h, scope, methods) {
      //   return scope.row.status
      //   // return statusDefine[scope.row.status].name
      // }
    },
    {
      label: '操作',
      minWidth: 200,
      render (h, scope, methods) {
        return self.renderTools(scope)
      }
    }
  ]
}
