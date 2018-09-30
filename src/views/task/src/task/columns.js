export default function () {
  const self = this
  return [
    {
      prop: 'name',
      label: '上线单',
      width: 180
    },
    {
      prop: 'project_name',
      label: '项目',
      width: 180
    },
    {
      prop: 'user_id',
      label: '用户id',
      width: 120
    },
    {
      label: '版本',
      width: 120,
      render (h, scope) {
        return (scope.row.project_info && scope.row.project_info.version) || ''
      }
    },
    {
      label: '环境',
      width: 120,
      render (h, scope) {
        return (scope.row.project_info && scope.row.project_info.environment_id) || ''
      }
    },
    {
      prop: 'updated_at',
      label: '更新时间',
      width: 160
    },
    {
      prop: 'status',
      label: '状态',
      width: 80
    },
    {
      label: '操作',
      minWidth: 180,
      render (h, scope, methods) {
        return (
          <div>
            <el-button type="text" size="small" onClick={() => self.review({...scope.row})}>审核</el-button>
            <el-button type="text" icon="el-icon-edit" size="small" onClick={() => self.edit({...scope.row})}>编辑</el-button>
            <el-button type="text" class="user-delete" icon="el-icon-delete" size="small" onClick={() => self.delete({...scope.row})}>删除</el-button>
          </div>
        )
      }
    }
  ]
}
