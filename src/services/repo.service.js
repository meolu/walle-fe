import {get} from '@/bases/http.base'

/**
 *
 * 获取项目分支列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getBranches (params = {}, config = {}) {
  return get('repo/branches/', params, config)
}

/**
 *
 * 获取项目tag列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getTags (params = {}, config = {}) {
  return get('repo/tags/', params, config)
}

/**
 *
 * 获取项目commits列表
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function getCommits (params = {}, config = {}) {
  return get('repo/commits/', params, config)
}
