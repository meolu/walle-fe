const STATUS = {
  0: '无效',
  1: '正常'
}
export default function () {
  const self = this
  return [
    {
      label: '名称',
      width: 250,
      prop: 'env_name'
    },
    {
      label: '状态',
      width: 250,
      prop: 'status',
      render (h, scope) {
        return STATUS[scope.row.status]
      }
    },
    {
      label: '空间',
      width: 250,
      prop: 'space_name'
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
