import request from '@/utils/request'

export function getGroupTypeList() {
  return request({
    url: '/Type/getGroupTypeList',
    method: 'get'
  })
}

export function getGroupTypeByName(name) {
  return request({
    url: '/Type/getGroupTypeByName',
    method: 'get',
    params: { name }
  })
}

export function addGroupType(data) {
  return request({
    url: '/Type/addGroupType',
    method: 'post',
    data
  })
}

export function deleteGroupType(id) {
  return request({
    url: '/Type/deleteGroupType',
    method: 'delete',
    params: { id }
  })
}

// export function allDeleteGroup(data) {
//   return request({
//     url: '/Type/allDelete',
//     method: 'post',
//     data
//   })
// }

export function updateGroupType(data) {
  return request({
    url: '/Type/updateGroupType',
    method: 'post',
    data
  })
}

export function pagination(page, size) {
  return request({
    url: '/Type/pagination',
    method: 'get',
    params: { page, size }
  })
}
