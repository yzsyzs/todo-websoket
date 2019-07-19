import * as types from './mutation-types'

const mutations = {
  [types.GET_DETAIL] (state, obj) {
    state.detailObj = {...obj}
  }
}

export default mutations
