import {get, post, put, Delete} from '@/bases/http.base'

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
  return post('task', params)
}

/**
 *
 * 更新上线单
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateTask (id, params = {}) {
  return put(`task/${id}`, params)
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
