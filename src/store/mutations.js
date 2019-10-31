import * as types from './mutation-types'
const mutations = {
    [types.SOCKET_TEST] () {
      console.log(123)
    },
    [types.CHANGE_CONNECT_STATUS] () {
      console.log(12443)
    },
    [types.ADD_MESSAGE] (state, data) {
      state.messageList.push(data)
    },
    [types.ADD_UNREAD] () {
      console.log(12443)
    },
    [types.SET_USERS] (state, data) {
      try {
        localStorage.setItem(types.SET_USERS, JSON.stringify(data))
        state.user = data
      } catch (e) {
        console.log(e)
      }
      state.userList.push(data)
    }
  }
  
  export default mutations