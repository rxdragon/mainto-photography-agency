import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index.js'
import work from './work/index.js'
import upyun from './upyun/index.js'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    upyun,
    work
  },
  plugins: [
    createPersistedState()
  ]
})

export default store
