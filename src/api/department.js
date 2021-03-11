import request from '@/utils/request'

export function departmentQueryAll(data) {
  return request({
    url: `/integrated/department/queryAllDepartment/${data.page}`,
    method: 'get'
  })
}

export function createDepartment(data) {
  return request({
    url: `/integrated/department/addDepartment/${data.page}`,
    method: 'post',
    data
  })
}

export function updateDepartment(data) {
  return request({
    url: `/integrated/department/updateDepartment/${data.page}`,
    method: 'post',
    data
  })
}

export function deleteDepartment(data) {
  return request({
    url: `/integrated/department/delDepartment/${data.departmentUuid}/${data.page}`,
    method: 'get'
  })
}
