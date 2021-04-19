import request from '@/utils/request'

export function departmentQueryAll(data) {
  return request({
    url: `/department/queryAllDepartment/${data.page}`,
    method: 'get'
  })
}

export function createDepartment(data) {
  return request({
    url: `/department/addDepartment/${data.page}`,
    method: 'post',
    data: {
      departmentName: data.departmentName
    }
  })
}

export function updateDepartment(data) {
  return request({
    url: `/department/updateDepartment/${data.page}`,
    method: 'post',
    data
  })
}

export function deleteDepartment(data) {
  return request({
    url: `/department/delDepartment/${data.departmentUuid}/${data.page}`,
    method: 'get'
  })
}
