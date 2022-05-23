<template>
  <div>
    <input
      type="text"
      v-model="userName"
      placeholder="Введите ваше имя"
    >
    <button @click="approve">Подтвердить</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    userName: ""
  }),
  methods: {
    approve() {
      if (this.userName) {
        window.localStorage.setItem("userName", this.userName)
        this.$router.push('/chat')
      }
    }
  }
}
</script>
