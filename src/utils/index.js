export function isObject (value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

export function isUndefined (value) {
  return value === undefined
}

export function isArray (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export function isFunction (value) {
  if (!isObject(value)) {
    return false
  }
  return typeof value === 'function'
}
