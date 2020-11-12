import request from './network'
import {
  baseURL
} from './config'

export function getMultiData(){
  return request({
    url: baseURL + '/home/multidata'
  })
}