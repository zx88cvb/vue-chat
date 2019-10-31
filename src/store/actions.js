import * as types from './mutation-types'

export const SOCKET_TEST = function ({commit}) {
  commit(types.SOCKET_TEST)
}

export const SOCKET_connect = function({commit}) {
  commit('CHANGE_CONNECT_STATUS', true)
}

export const SOCKET_message = function({commit, state}, data) {
  commit('ADD_MESSAGE', data)
  if(!state.isVisible) {
    commit('ADD_UNREAD')
  }
}

export const SOCKET_USERS = function({commit}, data) {
  commit('SET_USERS', data)
}