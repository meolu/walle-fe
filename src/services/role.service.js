import {get, post, put, Delete} from '@/bases/http.base'

/**
 *
 * 获取角色列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getRoles (params = {}, config = {}) {
  return get('role/', params, {
    ...config,
    isRemoveField: true
  })
}

/**
 *
 * 获取角色
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getRole (id, params = {}, config = {}) {
  return get(`role/${id}`, params, config)
}

/**
 *
 * 新增角色
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function addRole (params = {}) {
  return post('role', params)
}

/**
 *
 * 更新角色
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateRole (id, params = {}) {
  return put(`role/${id}`, params)
}

/**
 *
 * 删除角色
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function deleteRole (id, params = {}) {
  return Delete(`role/${id}`, params)
}
