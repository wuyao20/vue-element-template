import request from '@/utils/request'

export function departmentQueryAll(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/department/queryAllDepartment/${data.page}`,
    method: 'get'
  })
}

export function createDepartment(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/department/addDepartment/${data.page}`,
    method: 'post',
    data: {
      departmentName: data.departmentName
    }
  })
}

export function updateDepartment(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/department/updateDepartment/${data.page}`,
    method: 'post',
    data
  })
}

export function deleteDepartment(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/department/delDepartment/${data.departmentUuid}/${data.page}`,
    method: 'get'
  })
}
