import request from '@/utils/request'

export function queryAllRole(data) {
  return request({
    url: `/roles/queryAllRole/${data.page}`,
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: `/roles/addRole/${data.page}`,
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `/roles/updateRole/${data.page}`,
    method: 'post',
    data
  })
}

export function delRole(data) {
  return request({
    url: `/roles/delRole/${data.uuid}/${data.page}`,
    method: 'get'
  })
}

export function queryAllLevels() {
  return request({
    url: '/jurisdiction/getAllList',
    method: 'get'
  })
}

export function queryLevelByUUId(uuid) {
  return request({
    url: `/jurisdiction/getOne/${uuid}`,
    method: 'get'
  })
}
