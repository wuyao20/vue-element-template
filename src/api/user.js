import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/login',
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(uuid) {
  return request({
    url: `/user/queryUser/${uuid}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function selectAllUser(data) {
  return request({
    url: `/user/selectAllUser/${data.page}/${data.content}`,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: `/user/addUser`,
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: `/user/updateUser/${data.page}`,
    method: 'post',
    data
  })
}

export function delUser(data) {
  return request({
    url: `/user/delUser/${data.uuid}/${data.page}`,
    method: 'get'
  })
}

export function getMenu() {
  return request({
    url: `/user/getAllAuthority`,
    method: 'get'
  })
}
