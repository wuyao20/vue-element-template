import request from '@/utils/request'

export function currentMonthWhole() {
  return request({
    url: '/import/whole/development',
    method: 'get'
  })
}
