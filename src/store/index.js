import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  modules: {
    user: user
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (val) {
      return {
        // 只存储state 中的user
        user: val.user
      }
    }
  })]
})
