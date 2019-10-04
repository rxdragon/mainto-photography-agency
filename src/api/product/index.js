import base from '../config';
import axios from '@/axios/index'

const product = {
  list(params) {
    return axios.get(`${base.url}/project_cloud3rd/photographer/product/list`,{params})
  },
  detail(params) {
    return axios.get(`${base.url}/project_cloud3rd/photographer/product/detail`,{params})
  },
  switch(params) {
    return axios.get(`${base.url}/project_cloud3rd/photographer/product/switch`,{params})
  }
}
export default product
