<template>
  <div class="chat">
    <input type="text" v-model="inputText" />
    <button @click="handleSendClick">submit</button>
    <div class="messages">
      <ul class="item">
        <li v-for="(item, index) of messageList" :key="index">
          <span class="username">{{item.senderName}}:</span>
          <span class="tips">{{item.msg}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      console.log(redata)
      this.messageList.push(redata.chatMsg)
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
          senderName: this.user.username,
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
  height: 500px;
  list-style: none;
  line-height: 1.4;
  overflow-y: scroll;
}

ul li {
  font-size: 12px;
  line-height: 1.6;
  margin: 0 5px 0 0;
}
</style>
