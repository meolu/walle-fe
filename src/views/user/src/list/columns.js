export default function () {
  const self = this
  return [
    {
      prop: 'name',
      label: '角色',
      width: 250
    },
    {
      prop: 'userCount',
      label: '用户数',
      width: 250
    },
    {
      label: '操作',
      minWidth: 200,
      render (h, scope, methods) {
        return (
          <div>
            <el-button type="text" size="small" onClick={() => self.edit({...scope.row})}>编辑</el-button>
            <el-button type="text" size="small" onClick={() => self.delete({...scope.row})}>删除</el-button>
          </div>
        )
      }
    }
  ]
}
