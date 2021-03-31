import request from '@/utils/request'

export function queryAllRole(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/roles/queryAllRole/${data.page}`,
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/roles/addRole/${data.page}`,
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/roles/updateRole/${data.page}`,
    method: 'post',
    data
  })
}

export function delRole(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/roles/delRole/${data.uuid}/${data.page}`,
    method: 'get'
  })
}
