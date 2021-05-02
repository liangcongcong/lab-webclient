import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Teacher/getTeacherList',
    method: 'get'
  })
}

export function getTeacherInfoViewByTeaNum(teaNum) {
  return request({
    url: '/Teacher/getTeacherByTeaNum',
    method: 'get',
    params: { teaNum }
  })
}

export function addTeacher(data) {
  return request({
    url: '/Teacher/addTeacher',
    method: 'post',
    data
  })
}

export function deleteTeacher(uid) {
  return request({
    url: '/Teacher/delete',
    method: 'delete',
    params: { uid }
  })
}

export function allDeleteTeacher(data) {
  return request({
    url: '/Teacher/allDelete',
    method: 'post',
    data
  })
}

export function updateTeacher(data) {
  return request({
    url: '/Teacher/update',
    method: 'post',
    data
  })
}

export function pagination(page,size) {
  return request({
    url: '/Teacher/pagination',
    method: 'get',
    params: { page,size }
  })
}


