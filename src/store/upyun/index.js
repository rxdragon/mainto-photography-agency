import Api from '@/api/index.js'
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
    getUpyun: state => state.config
  },
  actions: {
    initUpyun({ commit }) {
      Api.upyun.getConfig().then(res => {
        commit('setUpyun', res.msg)
      })
    },
    initHost({ commit }) {
      Api.upyun.getHost().then(res => {
        commit('setHost', res.msg)
      })
    }
  },
  mutations: {
    setUpyun(state, config) {
      state.config = config
    },
    setHost(state, host) {
      state.host = host
    }
  }
}