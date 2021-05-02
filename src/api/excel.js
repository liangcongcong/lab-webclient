import request from '@/utils/request'

export function exportExcel(data){
  return request({
    url: '/Excel/export',
    method: 'post',
    data
  })
}