import {get, post, put, Delete} from '@/bases/http.base'
import qs from 'qs'

/**
 *
 * 获取空间列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getSpaces (params = {}) {
  return get('space/', params, {
    isRemoveField: true,
    target: '.wl-table'
  })
}

/**
 *
 * 获取空间
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getSpace (id, params = {}) {
  return get(`space/${id}`, params)
}

/**
 *
 * 新增空间
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function addSpace (params = {}) {
  return post('space/', params, {
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
 * 更新空间
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateSpace (id, params = {}) {
  return put(`space/${id}`, params, {
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
 * 删除空间
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function deleteSpace (id, params = {}) {
  return Delete(`space/${id}`, params)
}

/**
 *
 * 切换空间
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function switchSpace (id, params = {}) {
  return put(`space/${id}/switch`, params)
}

/**
 *
 * 获取空间下的成员列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getSpaceMembers (id, params = {}, config) {
  return get(`space/${id}/members`, params, {
    isRemoveField: true,
    target: '.wl-table',
    ...config
  })
}

/**
 *
 * 更新空间下的某个member的角色
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateSpaceMember (id, params = {}) {
  return put(`space/${id}/member`, params, {
    target: '.wl-table',
    headers: {
      'content-type': 'multipart/form-data'
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }]
  })
}
