import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/SysUser/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/SysUser/register',
    method: 'post',
    data
  })
}

export function sendMailCode(email) {
  return request({
    url: '/SysUser/mail',
    method: 'post',
    params: { email }
  })
}

export function checkEmailIsOk(email) {
  return request({
    url: '/SysUser/checkEmailIsOk',
    method: 'post',
    params: { email }
  })
}

export function checkMobileIsOk(phone) {
  return request({
    url: '/SysUser/checkMobileIsOk',
    method: 'post',
    params: { phone }
  })
}

export function getInfo(uid) {
  return request({
    url: '/SysUser/getByUid',
    method: 'get',
    params: { uid }
  })
}

export function logout() {
  return request({
    url: '/SysUser/logout',
    method: 'post'
  })
}

export function updateStatusByUid(uid,status) {
  return request({
    url: '/SysUser/updateStatusByUid',
    method: 'post',
    params: { uid,status }
  })
}
export function allUpdateStatusByUid(data) {
  return request({
    url: '/SysUser/allUpdateStatusByUid',
    method: 'post',
    data
  })
}
export function getUserList() {
  return request({
    url: '/SysUser/getUserList',
    method: 'get',
  })
}

