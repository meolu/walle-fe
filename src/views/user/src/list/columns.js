import Avatar from '../components/avatar.vue'
export default function () {
  const self = this
  return [
    {
      label: '用户名',
      width: 250,
      prop: 'username',
      render (h, scope) {
        return (
          <Avatar name={scope.row.username} avatar={scope.row.avatar}></Avatar>
        )
      }
    },
    {
      label: '邮箱',
      width: 250,
      prop: 'email'
    },
    {
      label: '状态',
      width: 250,
      prop: 'status'
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
