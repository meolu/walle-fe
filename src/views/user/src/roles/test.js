export const roleTest = {
  id: 1,
  name: '角色1',
  permissions: [
    {
      module: '用户中心',
      controller: '角色',
      permission: [0]
    },
    {
      module: '用户中心',
      controller: '用户',
      permission: [0, 1]
    },
    {
      module: '用户中心',
      controller: '用户组',
      permission: [1]
    },
    {
      module: '配置中心',
      controller: '项目',
      permission: []
    },
    {
      module: '配置中心',
      controller: '环境',
      permission: []
    },
    {
      module: '配置中心',
      controller: '上线单',
      permission: []
    }
  ]
}
