import {roleDefine, statusDefine} from '../constant'
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
      render (h, scope, methods) {
        return roleDefine[scope.row.role].name
      }
    },
    {
      label: '状态',
      width: 250,
      render (h, scope, methods) {
        return statusDefine[scope.row.status].name
      }
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
