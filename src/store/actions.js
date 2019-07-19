import * as types from './mutation-types'

const actions = {
  getDetail ({ commit, state }, obj) {
    commit(types.GET_DETAIL, obj)
  }
}
export default actions
