// 获取cookie、
export function getCookie (name) {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays,path) { // eslint-disable-line
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())+' ;path='+path // eslint-disable-line
};

// 删除cookie
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
}

// 循环遍历所有cookie，删除指定cookie
export function delCookieOf (expect) {
  const domain = document.domain
  expect.map(name => {
    var cval = getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + '; max-age=0; domain=' + domain + '; path=/'
    }
  })
}

export function getAllHmCookies () {
  let cookies = document.cookie
  var arrCookie = cookies.split('; ')
  return arrCookie.filter(item => {
    let name = item.split('=')[0]
    return name.indexOf('Hm') > -1
  }).map(item => {
    return item.split('=')[0]
  })
}
