<template>
  <div class="chat">
    <input type="text" v-model="inputText" />
    <button @click="handleSendClick">submit</button>
    <div class="messages">
      <ul class="item" v-for="(item, index) of messageList" :key="index">
        <li class="username">{{user.username}}:</li>
        <li class="tips">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters  } from 'vuex'
export default {
  name: 'chat',
  data() {
    return {
      websock: null,
      inputText: null,
      messageList: []
    }
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://192.168.1.113:8088/ws"
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      this.websocketsend(JSON.stringify('open'))
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
      const redata = JSON.parse(e.data)
      this.messageList.push(redata.chatMsg.msg)
    },
    websocketsend(data){//数据发送
      this.websock.send(data)
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e)
    },
    handleSendClick() {
      let message = {
        action: 2,
        chatMsg: {
          senderId: '1',
          receiverId: '1',
          msg: this.inputText,
          msgId: 'aa',
        }
      }
      this.websocketsend(JSON.stringify(message))
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
}
</script>

<style scope>
.messages .item{
  list-style: none;
  line-height: 1.4;
}

ul li {
  font-size: 12px;
  line-height: 1.5;
  margin: 0 5px 0 0;
  display: inline-block;
}
</style>
