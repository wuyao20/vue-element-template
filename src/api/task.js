import request from '../utils/request'

export function queryAllQuartz() {
  return request({
    url: '/relay/quartz/relaySelectAll',
    method: 'get'
  })
}

export function AddQuartz(data) {
  return request({
    url: '/relay/quartz/relayAdd',
    method: 'post',
    data
  })
}

export function DelQuartz(data) {
  return request({
    url: `/relay/quartz/relayDel/${data.uuid}`,
    method: 'get'
  })
}

export function ChangeQuartz(data) {
  return request({
    url: '/relay/quartz/relayChange',
    method: 'post',
    data
  })
}

export function changeQuartzState(data) {
  return request({
    url: `/relay/quartz/relayChangeState/${data.uuid}/${data.state}`,
    method: 'post'
  })
}
