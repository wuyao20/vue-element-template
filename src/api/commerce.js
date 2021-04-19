import request from '@/utils/request'

export function commerceRate(data) {
  return request({
    url: `/OnlineRetailers/reportOrderWhole`,
    method: 'post',
    data
  })
}
