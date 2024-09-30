import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'mgr/login',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: 'mgr/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'mgr/logout',
    method: 'post'
  })
}
