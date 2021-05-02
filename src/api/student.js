import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Student/getStudentList',
    method: 'get'
  })
}

export function getStudentInfoViewByStuNum(stuNum) {
  return request({
    url: '/Student/getStudentByStuNum',
    method: 'get',
    params: { stuNum }
  })
}

export function addStudent(data) {
  return request({
    url: '/Student/addStudent',
    method: 'post',
    data
  })
}

export function deleteStudent(uid) {
  return request({
    url: '/Student/delete',
    method: 'delete',
    params: { uid }
  })
}

export function allDeleteStudent(data) {
  return request({
    url: '/Student/allDelete',
    method: 'post',
    data
  })
}

export function updateStudent(data) {
  return request({
    url: '/Student/update',
    method: 'post',
    data
  })
}

export function pagination(page,size) {
  return request({
    url: '/Student/pagination',
    method: 'get',
    params: { page,size }
  })
}


