<template>
  <div class="chat">
    <div class="chat-body">
      <chat-head></chat-head>
      <div class="chat-content">
        <chat-people></chat-people>
        <chat-message @handleSendClick="handleSendClick" :messageList="messageList" :user="user"></chat-message>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChatHead from './Head'
import ChatPeople from './People'
import ChatMessage from './Message'
export default {
  name: 'chat',
  data() {
    return {
      websock: null,
      messageList: []
    }
  },
  components: {
    ChatHead,
    ChatPeople,
    ChatMessage
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
      this.messageList.push(redata.chatMsg)
    },
    websocketsend(data){//数据发送
      this.websock.send(data)
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e)
    },
    handleSendClick(inputText) {
      let message = {
        action: 2,
        chatMsg: {
          senderId: this.user.id,
          senderName: this.user.username,
          receiverId: '1',
          msg: inputText,
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
  * {
    font-size: 14px;
  }
  .chat {
    min-height: 48rem;
  }
  .chat-body {
    display: flex;
    flex-direction: column;
    margin: 0 22rem;
  }

  .chat-content {
    display: flex;
    min-height: 48rem;
  }
</style>
