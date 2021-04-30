import request from '@/utils/request'

export function currentMonthWhole() {
  return request({
    url: '/import/whole/development',
    method: 'get'
  })
}

export function vip3QueryAllTargetByPhone(data) {
  return request({
    url: `http://localhost:7799/tempActive/vip3/queryAllTarget/${data.userPhone}/${data.page} `,
    method: 'get'
  })
}

export function vip3QueryAllTarget(data) {
  return request({
    url: `/tempActive/vip3/queryAllTarget/${data.page}`,
    method: 'get'
  })
}

export function updateVisit(data) {
  return request({
    url: `/tempActive/vip3/updateVisit/${data.userNo}`,
    method: 'post',
    data
  })
}
