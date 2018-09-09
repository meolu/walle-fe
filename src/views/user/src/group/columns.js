export default function () {
  const self = this
  return [
    {
      prop: 'group_name',
      label: '用户组',
      width: 250
    },
    {
      prop: 'users',
      label: '用户数',
      width: 250
    },
    {
      label: '操作',
      minWidth: 200,
      render (h, scope, methods) {
        return (
          <div>
            <el-button type="text" icon="el-icon-edit" size="small" onClick={() => self.edit({...scope.row})}>编辑</el-button>
            <el-button type="text" class="user-delete" icon="el-icon-delete" size="small" onClick={() => self.delete({...scope.row})}>删除</el-button>
          </div>
        )
      }
    }
  ]
}
