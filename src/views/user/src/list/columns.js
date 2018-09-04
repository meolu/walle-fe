export default function () {
  const self = this
  return [
    {
      label: 'username',
      width: 200,
      render (h, scope, methods) {
        const {row} = scope
        return (
          self.currentEditUser && self.currentEditUser.id === row.id
            ? <el-input value={self.currentEditUser.username} size="small" placeholder="请输入内容"
              on-input={(val) => { self.currentEditUser.username = val }}></el-input>
            : row.username
        )
      }
    },
    {
      label: '真实用户名',
      width: 200,
      render (h, scope, methods) {
        const {row} = scope
        return (
          self.currentEditUser && self.currentEditUser.id === row.id
            ? <el-input value={self.currentEditUser.realname} size="small" placeholder="请输入内容"
              on-input={(val) => { self.currentEditUser.realname = val }}></el-input>
            : row.realname
        )
      }
    },
    {
      label: '邮箱',
      width: 250,
      render (h, scope, methods) {
        const {row} = scope
        return (
          self.currentEditUser && self.currentEditUser.id === row.id
            ? <el-input value={self.currentEditUser.email} size="small" placeholder="请输入内容"
              on-input={(val) => { self.currentEditUser.email = val }}></el-input>
            : row.email
        )
      }
    },
    {
      prop: 'role',
      label: '角色',
      width: 200
    },
    {
      label: '操作',
      minWidth: 200,
      render (h, scope, methods) {
        const {row} = scope
        const isEditCurrent = self.currentEditUser && self.currentEditUser.id === row.id
        return (
          <div>
            <el-button type="text" size="small" icon="el-icon-edit" onClick={() => self.edit({...scope.row}, isEditCurrent ? 'save' : 'edit')}>{ isEditCurrent ? '保存' : '编辑'}</el-button>
            <el-button type="text" class="user-delete" size="small" icon="el-icon-delete" onClick={() => self.delete({...scope.row})}>删除</el-button>
          </div>
        )
      }
    }
  ]
}
