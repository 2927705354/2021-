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
    url: '/manage/user/login.do',
    method: 'post',
    data: qs.stringify(params),

  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout.do',
    method: 'post',

  })
}

// 获取商品管理数据
export function list(num) {
  return request({
    url: `/manage/product/list.do?pageNum=${num}`,
    method: 'post',

  })
}

// 搜索商品
export function search(name, val) {
  return request({
    url: `/manage/product/search.do?listType=search&pageNum=1&${name}=${val}`,
    method: 'get',

  })
}

// 设置商品状态
export function setsale(id, status) {
  return request({
    url: `/manage/product/set_sale_status.do?productId=${id}&status=${status}`,
    method: 'get',

  })
}

// 查看商品详情
export function detail(id) {
  return request({
    url: `/manage/product/detail.do?productId=${id}`,
    method: 'get',

  })
}
// 获取列表数据
export function getlist(id) {
  return request({
    url: `/manage/category/get_category.do?categoryId=0`,
    method: 'get',

  })
}
// 获取列表数据二
export function getlist2(id) {
  return request({
    url: `/manage/category/get_category.do?categoryId=${id}`,
    method: 'get',

  })
}
// url
export function url(data) {
  return request({
    url: `/manage/product/upload.do`,
    method: 'post',
    data:data
  })
}

// cate
export function cate(data) {
  return request({
    url: '/manage/category/get_category.do?categoryId=0',
    method: 'get',
    data:data
  })
}

// 修改品类名称
export function setcate(id, name) {
  return request({
    url: `/manage/category/set_category_name.do?categoryId=${id}&categoryName=${name}`,
    method: 'get',
  })
}
// 查看其子类
export function lookcate(id) {
  return request({
    url: `/manage/category/get_category.do?categoryId=${id}`,
    method: 'get',
  })
}
