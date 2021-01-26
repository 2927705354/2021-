import request from '@/until/request'
let qs=require('qs')

// export function getUserInfo(params) {
//   return request({
//     url: '/user/userinfo',
//     method: 'post',
//     data: qs.stringify(params),
//   })
// }

// 登录接口
export function login(params) {
  return request({
    url: 'api/manage/user/login.do',
    method: 'post',
    data: qs.stringify(params),

  })
}

// 退出登录
export function logout() {
  return request({
    url: 'api/user/logout.do',
    method: 'post',

  })
}