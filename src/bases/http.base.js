import { API_HOST } from '@/config/global.config'
import fetch from '@/config/axios.config'

const DEFAULT_CONFIG = {
  isAutoMsg: true,
  // 消息提示的 title
  messageTitle: '操作提示',
  messagePrefix: undefined,
  // 自动loading
  isLoading: true,
  // Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；
  // 若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点默认是 document.body
  target: undefined,
  hasUid: true,
  // isApiHost  是否添加前缀 默认是true
  isApiHost: true,
  // 如果参数是空值是不传
  isRemoveField: false,
  // 和 isRemoveField 一起使用
  removeField: []
}

const POST_HEADER = {
  headers: {
    'content-type': 'application/json'
  }
}

/**
 * get 提交
 * @param {String} url 请求的url
 * @param {any} params  请求的参数
 * @param {Obejct} config  请求配置
 * @returns Promise
 */
export function get (url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...config}
  opts.params = getParams(params, opts)
  return fetch.get(getUrl(url, opts.isApiHost), opts)
}

/**
 *
 * post 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {any} isApiHost 请求配置
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function post (url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  return fetch.post(getUrl(url, opts.isApiHost), getParams(params, opts), opts)
}

/**
 *
 * put 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function put (url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  return fetch.put(getUrl(url, opts.isApiHost), getParams(params, opts), opts)
}

/**
 *
 * delete 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function Delete (url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  return fetch.delete(getUrl(url, opts.isApiHost), getParams(params, opts), opts)
}

/**
 *
 * 上传
 * @export
 * @param {any} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {any} [config={}] 配置
 * @returns Promise
 */
export function upload (url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  let form = new FormData()
  Object.keys(params).forEach(key => {
    form.append(key, params[key])
  })
  return fetch.post(getUrl(url, opts.isApiHost), form, opts)
}

/**
 *
 * 下载
 * @export
 * @param {any} url 请求
 * @param {any} [params={}] 请求参数
 * @param {string} [type='post'] 请求类型
 * @param {any} [config={}] 配置
 */
export function download (url, params = {}, type = 'post', config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  let $form = document.createElement('form')
  $form.setAttribute('method', type)
  $form.setAttribute('hidden', 'hidden')
  $form.setAttribute('action', getUrl(url, opts.isApiHost))

  let createInput = (name, value) => {
    let input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', name)
    input.setAttribute('value', value)

    $form.appendChild(input)
  }

  Object.keys(params).forEach(key => {
    createInput(key, params[key])
  })

  let $body = document.body || document.getElementsByTagName('body')[0]
  $body.append($form)
  $form.submit()
  $form.remove()
}

/**
 *
 * url 处理如果 isApiHost 为true 则添加 API_HOST
 * @param {any} url
 * @param {any} isApiHost
 * @returns
 *
 */
function getUrl (url, isApiHost) {
  if (!isApiHost) {
    return url
  }
  let arr = [API_HOST]
  arr.push(url)
  return arr.join('')
}

/**
 *
 * 处理参数 移除值是 空的 和加上一些用户信息等操作
 * @param {any} params 传入参数
 * @param {any} config 配置
 * @returns 返回新的参数
 */
function getParams (params, config) {
  // 用户相关
  if (!config.isRemoveField) {
    return params
  }
  return removeEmptyField(params, config.removeField)
}

/**
 *
 * 移除提交请求中 列为空 null undefined 的值
 * @param {any} [params={}] 传入的参数
 * @param {any} [removeField=[]] 需要移除的列
 */
function removeEmptyField (params = {}, removeField = []) {
  let copyParams = JSON.parse(JSON.stringify(params))
  let arrField = removeField
  if (removeField.length === 0) {
    arrField = Object.keys(params)
  }
  arrField.forEach(key => {
    let val = copyParams[key]
    if (val === '' || val === undefined || val === null) {
      delete copyParams[key]
    }
  })
  return copyParams
}

export const removeField = removeEmptyField
