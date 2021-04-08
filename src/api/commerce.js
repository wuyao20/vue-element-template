import request from '@/utils/request'

export function commerceRate(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/OnlineRetailers/reportOrderWhole`,
    method: 'post',
    data
  })
}
