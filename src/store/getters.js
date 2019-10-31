import * as types from './mutation-types'

// 用户
export const user = (state) => {
    if (!state.user) {
      return JSON.parse(localStorage.getItem(types.SET_USERS)) ? JSON.parse(localStorage.getItem(types.SET_USERS)) : {}
    }
    return state.user
}