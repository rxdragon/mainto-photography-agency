import Api from '@/api/index.js'
import { message } from 'ant-design-vue'
export default {
  state: {
    config: {
      bucket: '',
      policy: '',
      signature: ''
    },
    host: ''
  },
  getters: {
    getUpyun: state => state.config,
    getHost: state => state.host || 'http://fed.dev.hzmantu.com/upload_dev/'
  },
  actions: {
    initUpyun ({ commit }) {
      Api.upyun.getConfig().then(res => {
        commit('setUpyun', res.msg)
        Api.upyun.getHost().then(res => {
          commit('setHost', res.msg)
        })
      }).catch((e) => {
        message.error(e.data.error_msg, 15)
      })
    }
  },
  mutations: {
    setUpyun (state, config) {
      state.config = config
    },
    setHost (state, host) {
      state.host = host
    }
  }
}
