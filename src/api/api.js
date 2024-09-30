import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 分页查询
export function page(url, obj) {
  return request({
    url: url,
    method: 'post',
    params: obj
  })
}
// 查询
export function get(url, params = {}) {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getAndToken(url) {
  return request({
    url: url,
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}
export function getData(url, date) {
  return request({
    url: url,
    method: 'get',
    data: date
  })
}
// 删除
export function del(url, date) {
  return request({
    url: url,
    method: 'delete',
    data: date
  })
}

// post
export function post(url, data) {
  return request({
    url: url,
    method: 'post',
    data: data
  })
}
export function postWWW(url, data) {
  return request({
    url: url,
    method: 'post',
    params: data
  })
}

// to
export function to(url, method, data) {
  return request({
    url: url,
    method: method,
    data: data
  })
}

export function file(url, data) {
  return request({
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    params: {
      type: 'file'
    }, data

  })
}

export default {
  page, // 分页
  get, // get
  del, // 删除
  post, // 新增
  to, // 可传方法
  file, // 文件上传
  getAndToken,
  postWWW
}
