import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'

// 获取验证码
export function captcha () {
  var timestamp=new Date().getTime();
  return "http://www.krtservice.com/tour-sso/captcha?t="+timestamp;
  //return requestUrl(`/captcha.jpg?t=`+timestamp)
}

// 登录
export function login (params) {
  return request({
    url: requestUrl('/sys/login'),
    method: 'post',
    data: requestParam(params)
  })
}

// 退出
export function logout () {
  return request({
    url: requestUrl('/sys/logout'),
    method: 'post',
    data: requestParam()
  })
}
