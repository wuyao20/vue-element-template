import request from '@/utils/request'

export function queryAllRole(data) {
  return request({
    url: `http://localhost:8080/integrated/roles/queryAllRole/${data.page}`,
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: `http://localhost:8080/integrated/roles/addRole/${data.page}`,
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `http://localhost:8080/integrated/roles/updateRole/${data.page}`,
    method: 'post',
    data
  })
}

export function delRole(data) {
  return request({
    url: `http://localhost:8080/integrated/roles/delRole/${data.uuid}/${data.page}`,
    method: 'get'
  })
}
