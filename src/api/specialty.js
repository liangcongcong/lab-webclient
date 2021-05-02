import request from '@/utils/request'

export function getSpecialtyList() {
  return request({
    url: '/Specialty/getSpecialtyList',
    method: 'get'
  })
}
