import {get, post, put, Delete} from '@/bases/http.base'
import qs from 'qs'

/**
 *
 * 获取用户列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getUsers (params = {}) {
  return get('user/', params, {
    isRemoveField: true,
    target: '.wl-table'
  })
}

/**
 *
 * 新增用户
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function addUser (params = {}) {
  return post('user/', params, {
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
 * 更新用户
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateUser (id, params = {}) {
  return put(`user/${id}`, params, {
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
 * 删除用户
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function deleteUser (id, params = {}) {
  return Delete(`user/${id}`, params)
}

/**
 *
 * 获取用户权限信息
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getUserMenu (params = {}) {
  return get('public/menu/', params, {
    isLoading: false
  })
}
