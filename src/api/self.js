import request from '@/utils/request'

export function queryAllTarget(content) {
  return request({
    url: `/selfSupport/middle/queryVague/${content}`,
    method: 'get'
  })
}

export function addMiddle(data) {
  return request({
    url: '/selfSupport/middle/add',
    method: 'post',
    data
  })
}

export function updateMiddle(data) {
  return request({
    url: '/selfSupport/middle/change',
    method: 'post',
    data
  })
}

export function deleteMiddle(uuid) {
  return request({
    url: '/selfSupport/middle/del/${uuid}',
    method: 'get'
  })
}

export function queryMiddleByPage(page) {
  return request({
    url: `/selfSupport/middle/queryAll/${page}`,
    method: 'get'
  })
}

export function queryTaskIndex(content) {
  return request({
    url: `/selfSupport/taskIndex/query/${content}`,
    method: 'get'
  })
}

export function queryTaskIndexByPage(page) {
  return request({
    url: `/selfSupport/taskIndex/queryAll/${page}`,
    method: 'get'
  })
}

export function addTaskIndex(data) {
  return request({
    url: `/selfSupport/taskIndex/add`,
    method: 'post',
    data
  })
}

export function updateTaskIndex(data) {
  return request({
    url: `/selfSupport/taskIndex/update`,
    method: 'post',
    data
  })
}

export function deleteTaskIndex(data) {
  return request({
    url: `/selfSupport/taskIndex/del`,
    method: 'post',
    data
  })
}
