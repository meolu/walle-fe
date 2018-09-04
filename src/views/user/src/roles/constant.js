export const roleData = [
  {
    module: '用户中心',
    controller: '角色',
    merge: true,
    permission: []
  },
  {
    module: '用户中心',
    controller: '用户',
    merge: false,
    permission: []
  },
  {
    module: '用户中心',
    controller: '用户组',
    merge: false,
    permission: []
  },
  {
    module: '配置中心',
    controller: '项目',
    merge: true,
    permission: []
  },
  {
    module: '配置中心',
    controller: '环境',
    merge: false,
    permission: []
  },
  {
    module: '配置中心',
    controller: '上线单',
    merge: false,
    permission: []
  }
]

export const permissions = [{
  id: 0,
  name: '查看'
},
{
  id: 1,
  name: '添加'
},
{
  id: 2,
  name: '修改'
},
{
  id: 3,
  name: '删除'
}]
