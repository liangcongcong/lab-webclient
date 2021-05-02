import request from '@/utils/request'

export function getGroupList() {
  return request({
    url: '/Group/getGroupList',
    method: 'get'
  })
}

export function getGroupByName(name) {
  return request({
    url: '/Group/getGroupByName',
    method: 'get',
    params: { name }
  })
}

export function addGroup(data) {
  return request({
    url: '/Group/addGroup',
    method: 'post',
    data
  })
}

export function deleteGroup(id) {
  return request({
    url: '/Group/deleteGroup',
    method: 'delete',
    params: { id }
  })
}

export function allDeleteGroup(data) {
  return request({
    url: '/Group/allDeleteGroup',
    method: 'post',
    data
  })
}

export function updateGroup(data) {
  return request({
    url: '/Group/updateGroup',
    method: 'post',
    data
  })
}

export function pagination(page, size) {
  return request({
    url: '/Group/pagination',
    method: 'get',
    params: { page, size }
  })
}
export function getGroupByType(typeId) {
  return request({
    url: '/Group/getGroupByType',
    method: 'get',
    params: { typeId }
  })
}
