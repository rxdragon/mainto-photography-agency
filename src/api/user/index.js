import base from '../config';
import axios from '@/axios/index'

const user = {
  list() {
    return axios.get(`${base.url}/manage/banner/getList`)
  },
  loginAuth(params, config = {}) {
    return axios.post(`${base.devUrl}/manage_auth/cloud3rdLogin`, params, config)
  },
  getInfo() {
    return axios.get(`${base.url}/project_cloud3rd/retoucher/userInfo`)
  }
}
export default user
