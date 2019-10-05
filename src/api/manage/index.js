import base from '../config';
import axios from '@/axios/index'

const manage = {
  list() {
    return axios.get(`${base.url}/project_cloud3rd/photographer/subuser/list`)
  },
  disable(params) {
    return axios.post(`${base.url}/project_cloud3rd/retoucher/subuser/disable`, params)
  },
  enable(params) {
    return axios.post(`${base.url}/project_cloud3rd/retoucher/subuser/enable`, params)
  },
  create(params) {
    return axios.post(`${base.url}/project_cloud3rd/photographer/subuser/add`, params)
  },
  edit(params) {
    return axios.post(`${base.url}/project_cloud3rd/photographer/subuser/editUser`, params)
  }
}
export default manage