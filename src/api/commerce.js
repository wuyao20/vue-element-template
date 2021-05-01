import request from '@/utils/request'

export function commerceRate(data) {
  return request({
    url: `/OnlineRetailers/reportOrderWhole`,
    method: 'post',
    data
  })
}

export function queryAllDeliveryByPage(data) {
  return request({
    url: `/OnlineRetailers/delivery/queryAll/${data.page}`,
    method: 'get'
  })
}

export function queryAllDeliveryByPageAndContent(data) {
  return request({
    url: `/OnlineRetailers/delivery/queryAll/${data.page}/${data.content}`,
    method: 'get'
  })
}

export function deliveryUpdate(data) {
  return request({
    url: `/OnlineRetailers/delivery/change`,
    method: 'post',
    data
  })
}

export function deliveryCreate(data) {
  return request({
    url: `/OnlineRetailers/delivery/add`,
    method: 'post',
    data
  })
}

export function deliveryDelete(data) {
  return request({
    url: `/OnlineRetailers/delivery/del/${data.courierUuid}`,
    method: 'get'
  })
}

export function commerceThatDayDev() {
  return request({
    url: `/OnlineRetailers/reportOrderDayWhole`,
    method: 'get'
  })
}
