import {get, post, put, Delete} from '@/bases/http.base'
import qs from 'qs'

/**
 *
 * 获取服务器列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getServers (params = {}) {
  return get('server/', params, {
    isRemoveField: true,
    target: '.wl-table'
  })
}

/**
 *
 * 新增服务器
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function addServer (params = {}) {
  return post('server/', params, {
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
 * 更新服务器
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateServer (id, params = {}) {
  return put(`server/${id}`, params, {
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
 * 删除服务器
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function deleteServer (id, params = {}) {
  return Delete(`server/${id}`, params)
}

/**
 *
 * 获取该服务器信息
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getServer (id, params = {}) {
  return get(`server/${id}`, params, {
    isLoading: false
  })
}
