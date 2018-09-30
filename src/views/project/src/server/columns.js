export default function () {
  const self = this
  return [
    {
      label: '名称',
      width: 250,
      prop: 'name'
    },
    {
      label: 'IP',
      width: 250,
      prop: 'host'
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
