<template>
  <div>
    <input type="text" v-model="inputText" />
    <button @click="handleSendClick">submit</button>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      websock: null,
      inputText: null
    }
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://127.0.0.1:8088/ws"
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      let actions = {"test":"12345"}
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
      const redata = e.data
      console.log(redata)
    },
    websocketsend(data){//数据发送
      this.websock.send(data)
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e)
    },
    handleSendClick() {
      this.websocketsend(this.inputText)
    }
  }
}
</script>

<style scope>
  
</style>
