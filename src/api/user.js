import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:8080/integrated/login',
    method: 'post',
    data
  })
}

export function getInfo(uuid) {
  return request({
    url: `http://localhost:8080/integrated/user/queryUser/${uuid}`,
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
    url: `http://localhost:8080/integrated/user/selectAllUser/${data.page}/${data.content}`,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: `http://localhost:8080/integrated/user/addUser`,
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: `http://localhost:8080/integrated/user/updateUser/${data.page}`,
    method: 'post',
    data
  })
}

export function delUser(data) {
  return request({
    url: `http://localhost:8080/integrated/user/delUser/${data.uuid}/${data.page}`,
    method: 'get'
  })
}
