import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index.js'
import work from './work/index.js'
import upyun from './upyun/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    upyun,
    work
  }
})

export default store
