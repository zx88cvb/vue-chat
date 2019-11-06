<template>
  <div class="message-content">
    <div class="view">
      <div class="view-content" ref="messages">
        <div class="item " v-for="(item, index) of messageList" :key="index" :class="[user.id === item.senderId? 'myself': 'other']">
            <div class="user">
            <span class="username">{{item.senderName}}</span>
            <span class="datetime">2019-11-5 15:40:16</span>
            </div>
            <div class="text">{{item.msg}}</div>
        </div>
      </div>
    </div>
      <div class="message">
        <div class="util-bar">工具栏占位</div>
        <textarea class="textarea" v-model="inputText" @keyup.enter="handleSendClick"></textarea>
        <div class="send">
        <button class="send-btn" @click="handleSendClick">发送</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    messageList: {
      default: () => []
    },
    user: {
      default: null
    }
  },
  data() {
    return {
      inputText: null
    }
  },
  methods: {
    handleSendClick() {
      this.$emit('handleSendClick', this.inputText)
      this.inputText = null
    }
  },
  watch: {
    messageList () {
      let messages = this.$refs.messages
      this.$nextTick(() => {
        messages.scrollTop = messages.scrollHeight + 100
      })
    }
  }
}
</script>

<style scope>
  .chat-content .message-content {
    flex: auto;
    /* background: darkorchid; */
  }

  .message-content .view {
    height: 38rem;
    /* background: darkseagreen; */
    padding-bottom: 2rem;
  }

  .view .view-content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 100%;
    overflow-y: scroll;
  }

  .message-content .view .item {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
  }

  .message-content .view .item .text {
    background: rgba(0,0,0,.06);
    border-radius: 0.5rem;
    padding: 0 0.5rem;
  }

  .message-content .view .myself {
    align-self: flex-end;
  }

  .view .user {
    margin-bottom: 0.7rem;
  }

  .view .myself .user {
    align-self: flex-end;
  }

  .message-content .view .other {
    align-self: flex-start;
  }

  .view .other .user {
    align-self: flex-start;
  }

  .view .user .username {
    color: rgba(50, 139, 255, 0.932);
  }
  .view .myself .username {
    color: rgba(29, 133, 38, 0.932);
  }

  .view .user .datetime {
    padding-left: 0.7rem;
  }

  .message-content .message {
    display: flex;
    flex-direction: column;
    flex: 0 0 10rem;
    height: 10rem;
    /* background: dodgerblue; */
  }

  .message-content .util-bar {
    flex: 0 0 2rem;
    color: #ddd;
    background-color: rgba(0,115,160,.6);
  }

  .textarea {
    flex: 1;
    padding: 0.5rem;
    resize: none;
    width: 100%;
    border: none;
    outline: none;
  }

  .message-content .send {
    align-self: flex-end;
  }

  .send button {
    width: 60px;
    height: 30px;
    margin-right: 10px;
    background-color: #ccc;
    color: #fff;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 1rem;
  }
</style>
