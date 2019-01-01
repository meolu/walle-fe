import {get, post, put, Delete} from '@/bases/http.base'
import qs from 'qs'

/**
 *
 * 获取上线单列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getTasks (params = {}) {
  return get('task/', params, {
    target: '.wl-table',
    isRemoveField: true
  })
}

/**
 *
 * 获取上线单
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getTask (id, params = {}, config = {}) {
  return get(`task/${id}`, params, config)
}

/**
 *
 * 新增上线单
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function addTask (params = {}) {
  return post('task/', params, {
    headers: {
      'content-type': 'multipart/form-data'
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }]
  })
}

/**
 *
 * 更新上线单
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateTask (id, params = {}) {
  return put(`task/${id}`, params, {
    headers: {
      'content-type': 'multipart/form-data'
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }]
  })
}

/**
 *
 * 通过上线单
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function auditTask (id, params = {}) {
  return put(`task/${id}/audit`, params, {
    headers: {
      'content-type': 'multipart/form-data'
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }]
  })
}

/**
 *
 * 驳回上线单
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function rejectTask (id, params = {}) {
  return put(`task/${id}/reject`, params, {
    headers: {
      'content-type': 'multipart/form-data'
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }]
  })
}

/**
 *
 * 删除上线单
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function deleteTask (id, params = {}) {
  return Delete(`task/${id}`, params)
}

/**
 *
 * 回滚
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function rollbackTask (id, params = {}) {
  return put(`task/${id}/rollback`, params, {
    headers: {
      'content-type': 'multipart/form-data'
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }]
  })
}
