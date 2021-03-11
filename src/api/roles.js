import request from '@/utils/request'

export function queryAllRole(data) {
  return request({
    url: `/integrated/roles/queryAllRole/${data.page}`,
    method: 'get'
  })
}
