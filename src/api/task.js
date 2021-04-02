import request from '../utils/request'

export function queryAllQuartz() {
  return request({
    url: 'http://221.6.211.32:7799/integrated/relay/quartz/relaySelectAll',
    method: 'get'
  })
}

export function AddQuartz(data) {
  return request({
    url: 'http://221.6.211.32:7799/integrated/relay/quartz/relayAdd',
    method: 'post',
    data
  })
}

export function DelQuartz(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/relay/quartz/relayDel/${data.uuid}`,
    method: 'get'
  })
}

export function ChangeQuartz(data) {
  return request({
    url: 'http://221.6.211.32:7799/integrated/relay/quartz/relayChange',
    method: 'post',
    data
  })
}

export function changeQuartzState(data) {
  return request({
    url: `http://221.6.211.32:7799/integrated/relay/quartz/relayChangeState/${data.uuid}/${data.state}`,
    method: 'post'
  })
}
