const STATUS = {
  0: '无效',
  1: '正常'
}
export default function () {
  const self = this
  return [
    {
      prop: 'name',
      label: '项目名',
      width: 180
    },
    {
      prop: 'status',
      label: '状态',
      width: 180,
      render (h, scope) {
        return STATUS[scope.row.status]
      }
    },
    {
      prop: 'version',
      label: '版本',
      width: 180
    },
    {
      label: '操作',
      minWidth: 200,
      render (h, scope, methods) {
        return (
          <div>
            <el-button type="text" icon="el-icon-edit" size="small" onClick={() => self.editmembers({...scope.row})}>成员管理</el-button>
            <el-button type="text" icon="el-icon-edit" size="small" onClick={() => self.edit({...scope.row})}>编辑</el-button>
            <el-button type="text" class="user-delete" icon="el-icon-delete" size="small" onClick={() => self.delete({...scope.row})}>删除</el-button>
          </div>
        )
      }
    }
  ]
}
