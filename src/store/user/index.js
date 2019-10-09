export default {
  state: {
    user: {
      username: '',
      nick: '',
      level: ''
    },
  },
  getters: {
    getUser: state => state.user
  },
  actions: {
    setUserInfo( { commit }, userInfo) {
      commit('setUser', userInfo)
    }
  },
  mutations: {
    setUser(state, userInfo) {
      state.user = userInfo
    }
  }
}