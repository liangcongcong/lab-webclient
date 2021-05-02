import request from '@/utils/request'

export function getSchoolList() {
  return request({
    url: '/School/getSchoolList',
    method: 'get'
  })
}
