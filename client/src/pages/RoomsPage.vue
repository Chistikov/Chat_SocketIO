<template>
  <div class="wrapper">
    <div class="rooms-container">
      rooms
      <hr>
      <div v-for="(room, key) in rooms" :key="key">
        <router-link :to="`/chat/${key}`" class="rooms-container__room">{{ room.name }}</router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
import api from '@/../api'
import actions from '../../../actions.json'

export default {
  data: () => ({
    rooms: null
  }),
  async mounted() {
    this.rooms = await api.fetchRooms()

    console.log(this.$socket)
    if (!window.localStorage.getItem("userName")) {
      this.$router.push('/')
      return
    }

    this.userName = window.localStorage.getItem("userName");

    this.$socket.on(actions.SUCCESS_CONNECTION, ({msg}) => {
      console.log(msg)
    })

    this.$socket.emit(actions.INITIAL_SETUP,
      {userName: this.userName}
    )

    this.$socket.on(actions.DISPATCH_UUID, (uuid) => {
      if (uuid) {
        window.localStorage.setItem('uuid', uuid)
      } else {
        console.error('Ошибка при получении токена')
        try {
          window.localStorage.removeItem('userName')
          window.localStorage.removeItem('uuid')
        } catch (e) {
          console.error(e)
        }
        this.$router.push('/')
      }
    })

    this.$socket.on(actions.DISPATCH_ALL_USERS, (users) => {
      console.log('ALL USERS :', users)
    })

  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 59px);
}
.rooms-container {
  width: 500px;
  text-align: center;
}
.rooms-container__room {
  color: #ccc;
  text-decoration: none;
}
</style>