export default function () {
  const self = this
  return [
    {
      label: 'username',
      width: 200,
      render (h, scope, methods) {
        const {row} = scope
        const isEditCurrent = self.currentEditUser && self.currentEditUser.id === row.id
        return (
          !isEditCurrent ? row.username
            : <el-input value={self.currentEditUser.username} size="small" placeholder="请输入内容"
              on-input={(val) => { self.currentEditUser.username = val }}
              on-blur={(val) => { self.validate('username') }}></el-input>
        )
      }
    },
    {
      label: '真实用户名',
      width: 200,
      render (h, scope, methods) {
        const {row} = scope
        const isEditCurrent = self.currentEditUser && self.currentEditUser.id === row.id
        return (
          !isEditCurrent ? row.realname
            : <el-input value={self.currentEditUser.realname} size="small" placeholder="请输入内容"
              on-input={(val) => { self.currentEditUser.realname = val }}
              on-blur={(val) => { self.validate('realname') }}></el-input>

        )
      }
    },
    {
      label: '邮箱',
      width: 250,
      prop: 'email'
    },
    {
      prop: 'role',
      label: '角色',
      width: 200,
      render (h, scope, methods) {
        const {row} = scope
        const isEditCurrent = self.currentEditUser && self.currentEditUser.id === row.id
        return (
          !isEditCurrent ? row.realname
            : <el-select size="small" value={self.currentEditUser.role} placeholder="请分配角色" on-input={(val) => { self.currentEditUser.role = val }}>
              {
                self.roles.map(item => {
                  return <el-option key={item.id} label={item.name} value={item.id}></el-option>
                })
              }
            </el-select>

        )
      }
    },
    {
      label: '操作',
      minWidth: 200,
      render (h, scope, methods) {
        const {row} = scope
        const isEditCurrent = self.currentEditUser && self.currentEditUser.id === row.id
        return self.renderTools(isEditCurrent, scope)
      }
    }
  ]
}
