<template>
  rooms page
</template>

<script>
import actions from '../../../actions.json'

export default {
  mounted() {
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