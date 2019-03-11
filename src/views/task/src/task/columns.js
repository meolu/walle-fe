const TASK_STATUS = {
  0: '新建提交',
  1: '审核通过',
  2: '审核拒绝',
  3: '上线中',
  4: '上线完成',
  5: '上线失败'
}
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
      width: 140
    },
    {
      prop: 'user_name',
      label: '用户名',
      width: 100
    },
    {
      label: '版本',
      width: 120,
      render (h, scope) {
        return scope.row.tag || scope.row.commit_id
      }
    },
    {
      prop: 'environment_name',
      label: '环境',
      width: 120
    },
    {
      prop: 'updated_at',
      label: '更新时间',
      width: 160
    },
    {
      prop: 'status',
      label: '状态',
      width: 80,
      render (h, scope) {
        return TASK_STATUS[scope.row.status]
      }
    },
    {
      label: '操作',
      minWidth: 200,
      render (h, scope, methods) {
        return (
          <div>
            {self.renderReview({...scope.row})}
            {self.renderDeploy({...scope.row})}
            {self.renderEditTool({...scope.row})}
            {self.renderRollbackTool({...scope.row})}
            {self.renderDeleteTool({...scope.row})}
          </div>
        )
      }
    }
  ]
}
