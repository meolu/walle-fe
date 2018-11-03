// import {statusDefine} from '../constant'
export default function () {
  const self = this
  return [
    {
      label: '空间名',
      width: 250,
      prop: 'name'
    },
    {
      label: '空间所属人',
      width: 250,
      prop: 'user_name'
      // render (h, scope, methods) {
      //   return scope.row.role_name
      //   // return roleDefine[scope.row.role].name
      // }
    },
    {
      label: '创建时间',
      width: 250,
      prop: 'created_at'
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
