import request from '@/utils/request'

export function queryAllFiles(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/files/queryAllFile/${data.page}`,
    method: 'get'
  })
}
