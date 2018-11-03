import {get, post, put, Delete} from '@/bases/http.base'
import qs from 'qs'

/**
 *
 * 获取项目列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getProjects (params = {}, config = {}) {
  return get('project/', params, {
    target: '.wl-table',
    isRemoveField: true,
    ...config
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
  return post('project/', params, {
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
 * 更新项目
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateProject (id, params = {}) {
  return put(`project/${id}`, params, {
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
 * 更新项目
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function updateProjectMembers (id, params = {}) {
  return put(`project/${id}/members`, params, {
    // headers: {
    //   'content-type': 'row'
    // },
    // transformRequest: [function (data) {
    //   return qs.stringify(data)
    // }]
  })
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
