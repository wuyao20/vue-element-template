import request from '@/utils/request'

export function queryAllFiles(data) {
  return request({
    url: `http://localhost:8080/integrated/files/queryAllFile/${data.page}`,
    method: 'get'
  })
}

export function fileUploadDatabase(uuid) {
  return request({
    url: `http://localhost:8080/integrated/files/import/manual/${uuid}`,
    method: 'get'
  })
}
