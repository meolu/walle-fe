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
 * 冻结用户
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function blockUser (id, params = {}) {
  return put(`user/${id}/block/`, params, {
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
 * 激活用户
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function activeUser (id, params = {}) {
  return put(`user/${id}/active/`, params, {
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
  return get('general/menu', params, {
    target: '.wl-layout'
  })
}

/**
 *
 * 登陆
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function login (params = {}) {
  return post('passport/login', params, {
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
 * 退出
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function logout (params = {}) {
  return post('passport/logout', params, {
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
 * 用户头像上传
 * @export
 * @param {any} [params={}]
 * @returns Promise
 */
export function avater (id, params = {}) {
  return post(`user/${id}/avater`, params, {
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
 * 获取walle的信息
 * @export
 * @returns Promise
 */
export function getWalleInfo () {
  return get('general/info')
}
