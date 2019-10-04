import base from '../config';
import axios from '@/axios/index'

const work = {
  getOrder(params) {
    return axios.get(`${base.url}/project_cloud3rd/photographer/order/list`,{params})
  },
  orderDetail(params) {
    return axios.get(`${base.url}/project_cloud3rd/photographer/order/detail`,{params})
  },
}
export default work
