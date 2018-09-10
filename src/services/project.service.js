import {get, post, put, Delete} from '@/bases/http.base'

/**
 *
 * 获取项目列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getProjects (params = {}) {
  return get('project/', params, {
    target: '.wl-table',
    isRemoveField: true
  })
}

/**
 *
 * 获取项目
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getProject (id, params = {}, config = {}) {
  return get(`project/${id}`, params, config)
}

/**
 *
 * 新增项目
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function addProject (params = {}) {
  return post('project', params)
}

/**
 *
 * 更新项目
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateProject (id, params = {}) {
  return put(`project/${id}`, params)
}

/**
 *
 * 删除项目
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function deleteProject (id, params = {}) {
  return Delete(`project/${id}`, params)
}
