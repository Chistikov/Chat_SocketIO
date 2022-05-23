<template>
  chat page
</template>

<script>
import {createSocketIOConnecton} from '../socketIO'
import actions from '../../../actions.json'

export default {
  mounted() {
    if (!window.localStorage.getItem("userName")) {
      this.$router.push('/')
      return
    }

    this.userName = window.localStorage.getItem("userName");
    const socket = createSocketIOConnecton();

    socket.on(actions.SUCCESS_CONNECTION, ({msg}) => {
      console.log(msg)
    })

    socket.emit(actions.INITIAL_SETUP,
      {userName: this.userName}
    )

    socket.on(actions.DISPATCH_UUID, (uuid) => {
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

  }
}
</script>