import {get, post, put, Delete} from '@/bases/http.base'
import qs from 'qs'

/**
 *
 * 获取环境列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getEnvironments (params = {}) {
  return get('environment/', params, {
    isRemoveField: true,
    target: '.wl-table'
  })
}

/**
 *
 * 新增环境
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function addEnvironment (params = {}) {
  return post('environment/', params, {
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
 * 更新环境
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateEnvironment (id, params = {}) {
  return put(`environment/${id}`, params, {
    target: '.wl-table',
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
 * 删除环境
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function deleteEnvironment (id, params = {}) {
  return Delete(`environment/${id}`, params)
}

/**
 *
 * 获取该环境信息
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getEnvironment (id, params = {}) {
  return get(`environment/${id}`, params, {
    isLoading: false
  })
}
