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

export const userlist = [{
  id: 1,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0
},
{
  id: 2,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 3,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 0,
  status: 0,
  password: 111
},
{
  id: 4,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 0,
  status: 0,
  password: 111
},
{
  id: 5,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 6,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 7,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 8,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 9,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 10,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 11,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 12,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 13,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
},
{
  id: 14,
  username: 'admin',
  realname: '陈凤娟',
  email: 'chenfengjuan@renrenche.com',
  role: 1,
  status: 0,
  password: 111
}]

export const grouplist = [{
  name: '用户组1',
  userCount: 5,
  id: 1
},
{
  name: '用户组1',
  userCount: 5,
  id: 2
},
{
  name: '用户组1',
  userCount: 5,
  id: 3
},
{
  name: '用户组1',
  userCount: 5,
  id: 4
},
{
  name: '用户组1',
  userCount: 5,
  id: 5
},
{
  name: '用户组1',
  userCount: 5,
  id: 6
},
{
  name: '用户组1',
  userCount: 5,
  id: 7
},
{
  name: '用户组1',
  userCount: 5,
  id: 8
},
{
  name: '用户组1',
  userCount: 5,
  id: 9
},
{
  name: '用户组1',
  userCount: 5,
  id: 10
},
{
  name: '用户组1',
  userCount: 5,
  id: 11
}]

export const groupEditTest = {
  name: 'group_name',
  users: [
    {
      id: 0,
      name: 'user0',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 1,
      name: 'user1',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 2,
      name: 'user2',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 3,
      name: 'user3',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 4,
      name: 'user4',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 5,
      name: 'user5',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 6,
      name: 'user6',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 7,
      name: 'user7',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 8,
      name: 'user8',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 9,
      name: 'user9',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 10,
      name: 'user10',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    },
    {
      id: 11,
      name: 'user11',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png'
    }
  ]
}
