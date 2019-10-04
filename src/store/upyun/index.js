import Api from '@/api/index.js'
export default {
  state: {
    config: {
      bucket: '',
      policy: '',
      signature: ''
    }
  },
  getters: {
    getUpyun: state => state.config
  },
  actions: {
    initUpyun({ commit }) {
      Api.upyun.getConfig().then(res => {
        commit('setUpyun', res.msg)
      })
    }
  },
  mutations: {
    setUpyun(state, config) {
      state.config = config
    }
  }
}