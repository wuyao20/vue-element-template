import request from '@/utils/request'

export function queryAllFiles(data) {
  return request({
    url: `/files/queryAllFile/${data.page}`,
    method: 'get'
  })
}

export function fileUploadDatabase(uuid) {
  return request({
    url: `/files/import/manual/${uuid}`,
    method: 'get'
  })
}
