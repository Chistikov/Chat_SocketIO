<template>
  <div class="room-id">{{ $route.params.roomId }}</div>
  <div class="chat-wrapper">
    <div class="msg-container">
      <div v-for="(chatMsg, index) of chatStack" :key="index">
        {{ `${chatMsg.userName} : ${chatMsg.msg}` }}
      </div>
    </div>
    <div class="input-msg-container">
      <input type="text" class="input-msg-container__input" v-model="inputMsg">
      <button 
        @click="sendMsg"
        class="input-msg-container__send-btn"
      >
      send
      </button>
    </div>
    
  </div>

</template>

<script>
import actions from '../../../actions.json'

export default {
  data: () => ({
    inputMsg: "",
    chatStack: []
  }),
  mounted() {
    let userId
    let userName
    try {
      userId = localStorage.getItem("uuid")
      userName = localStorage.getItem("userName")
    } catch (e) {
      console.error(e)
    }

    this.$socket.emit(actions.JOIN_TO_ROOM, {
      roomId: this.$route.params.roomId,
      userId: userId,
      userName: userName
    })

    this.$socket.on(actions.NOTIFY_TO_ROOM, msg => {
      console.log(msg)
    })

    this.$socket.on(actions.CHAT_MSG, chatMsg => {
      this.chatStack.push(chatMsg)
    })
  },
  methods: {
    sendMsg() {
      if (this.inputMsg) {
        const chatData = {
          chatId: this.$route.params.roomId,
          userName: localStorage.getItem('userName'),
          msg: this.inputMsg
        }
        this.$socket.emit(actions.CHAT_MSG, chatData)
        this.chatStack.push(chatData)
        this.inputMsg = ""
      }
    }
  }
}
</script>

<style scoped>
.room-id {
  width: 100%;
  text-align: center;
  background: #3d576b;
  font-weight: 300;
  font-size: 13px;
  padding: 7px;
}
.chat-wrapper {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: calc(100vh - 59px - 29px);
  justify-content: space-between;
}
.msg-container {
  padding: 15px;
}
.input-msg-container {
  display: flex;
}

.input-msg-container__input {
  flex-grow: 1;
  height: 40px;
  border: 0;
  padding: 0;
  outline: 0;
  text-indent: 10px;
  background: #436077;
  color: #fff;
}
.input-msg-container__send-btn {
  display: block;
  height: 40px;
  width: 200px;
  flex-shrink: 0;
  border: 0;
  background: #3E566B;
  color: #fff;
  text-transform: uppercase;
}
</style>