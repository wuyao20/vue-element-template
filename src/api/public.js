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

export function vip3AllService() {
  return request({
    url: `/tempActive/vip3/getServicePersonnelName`,
    method: 'get'
  })
}

export function vip3UpdateService(data) {
  return request({
    url: `/tempActive/vip3/updateAscription/${data.userNo}/${data.jobNumber}`,
    method: 'get'
  })
}

export function ascriptionAll() {
  return request({
    url: `/ascription/queryAscriptionAll`,
    method: 'get'
  })
}

export function ascriptionAllById(uuid) {
  return request({
    url: `/ascription/queryAscriptionByUuid/${uuid}`,
    method: 'get'
  })
}

export function addAscription(data) {
  return request({
    url: `/ascription/addAscription`,
    method: 'post',
    data
  })
}

export function deleteAscription(uuid) {
  return request({
    url: `/ascription/delAscription/${uuid}`,
    method: 'get'
  })
}

export function updateAscription(data) {
  return request({
    url: `/ascription/changeAscription`,
    method: 'post',
    data
  })
}

export function dayDevelopment() {
  return request({
    url: `/DayDevelopment/dayDevelopmentReport`,
    method: 'get'
  })
}
