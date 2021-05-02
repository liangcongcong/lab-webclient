import request from '@/utils/request'

export function getAcademyList() {
  return request({
    url: '/Academy/getAcademyList',
    method: 'get'
  })
}
