import Avatar from '../components/avatar.vue'
import {ROLES} from '@/config/global.config'
export default function () {
  const self = this
  return [
    {
      label: '用户名',
      width: 200,
      prop: 'username',
      render (h, scope) {
        return (
          <Avatar name={scope.row.username} avatar={scope.row.avatar}></Avatar>
        )
      }
    },
    {
      label: '邮箱',
      width: 200,
      prop: 'email'
    },
    {
      label: '状态',
      width: 100,
      prop: 'status'
    },
    {
      label: '角色',
      width: 150,
      render (h, scope) {
        return ROLES[scope.row.role]
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
