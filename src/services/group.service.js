import {get, post, put, Delete} from '@/bases/http.base'
import qs from 'qs'

/**
 *
 * 获取用户组列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getGroups (params = {}) {
  return get('group/', params, {
    target: '.wl-table'
  })
}

/**
 *
 * 获取用户组
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getGroup (id, params = {}) {
  return get(`group/${id}`, params)
}

/**
 *
 * 新增用户组
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function addGroup (params = {}) {
  return post('group/', params, {
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
 * 更新用户组
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateGroup (id, params = {}) {
  return put(`group/${id}`, params, {
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
 * 删除用户组
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function deleteUser (id, params = {}) {
  return Delete(`group/${id}`, params)
}
