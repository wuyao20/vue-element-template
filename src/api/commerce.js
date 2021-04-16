import request from '@/utils/request'

export function commerceRate(data) {
  return request({
    url: `http://localhost:8080/integrated/OnlineRetailers/reportOrderWhole`,
    method: 'post',
    data
  })
}
