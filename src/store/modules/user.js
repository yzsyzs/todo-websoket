const state = {
  // m-header公共的下拉框选中的值
  user: null
}
// m-header 下拉框公共 选择的异步行为
const actions = {
  getUserAction ({commit, state}, user) {
    commit('getUser', user)
  }
}
const mutations = {
  // m-header 下拉框公共 选择的异步行为
  getUser (state, user) {
    state.user = user
  }
}
const getters = {
  getUserGetter: state => state.user
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
