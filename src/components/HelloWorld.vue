<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
    <input type="text" class="username" v-model="user.username" placeholder="请输入用户名" />
    <button @click="handleUserClick">确定</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      user: {
        username: null
      }
    }
  },
  methods: {
    handleUserClick() {
      this.user.id = 'web_im_' + new Date().getTime()
      this.SOCKET_USERS(this.user)
      this.$router.push({
        name: 'chat'
      })
    },
    ...mapActions([
      'SOCKET_USERS'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
