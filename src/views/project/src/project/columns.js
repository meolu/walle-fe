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
      prop: 'environment_name',
      label: '环境',
      width: 180
    },
    {
      label: '空间',
      width: 180,
      prop: 'space_name'
    },
    {
      label: '操作',
      minWidth: 200,
      render (h, scope, methods) {
        return (
          <div>
            {self.renderMemberTool(scope.row)}
            {self.renderEditTool(scope.row)}
            {self.renderDeleteTool(scope.row)}
          </div>
        )
      }
    }
  ]
}
