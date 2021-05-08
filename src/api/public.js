import request from '@/utils/request'

export function currentMonthWhole() {
  return request({
    url: '/import/whole/development',
    method: 'get'
  })
}

export function vip3QueryAllTargetByPhone(data) {
  return request({
    url: `/tempActive/vip3/queryAllTarget/${data.page}/${data.userPhone}`,
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

export function noActiveDownloadFile(data) {
  return request({
    url: `/outputFiles/noActive/downloadFile`,
    method: 'post',
    data
  })
}

export function noActiveDownloadFilePage(data) {
  return request({
    url: `/outputFiles/noActive/getList/${data.page}`,
    method: 'get'
  })
}

export function noActiveDownloadDeleteFile(data) {
  return request({
    url: `/outputFiles/noActive/delFile/${data.outputId}`,
    method: 'get'
  })
}
