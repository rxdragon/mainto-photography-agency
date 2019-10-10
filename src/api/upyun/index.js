import base from '../config';
import axios from '@/axios/index'

const upyun = {
  getConfig() {
    return axios.get(`${base.url}/project_cloud3rd/photographer/common/sign/upyun`)
  }
}
export default upyun
