import base from '../config';
import axios from '@/axios/index'

const work = {
  list(params) {
    return axios.get(`${base.url}/project_cloud3rd/photographer/order/list`, {params})
  },
  detail(params) {
    return axios.get(`${base.url}/project_cloud3rd/photographer/order/detail`, {params})
  },
  cancel(params) {
    return axios.post(`${base.url}/project_cloud3rd/photographer/order/cancel`, params)
  },
}
export default work
