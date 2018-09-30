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
