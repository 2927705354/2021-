import request from '@/until/request'
let qs=require('qs')

export function getUserInfo(params) {
  return request({
    url: '/user/userinfo',
    method: 'post',
    data: qs.stringify(params),
  })
}

export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.parse(params),
  })
}