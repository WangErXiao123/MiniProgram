import request from './network'

export function getMultiData(){
  return request({
    url: '/home/multidata'
  })
}
export function getProduct(type, page){
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}