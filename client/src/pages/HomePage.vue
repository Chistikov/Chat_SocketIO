<template>
  <div class="wrapper">
    <div class="input-msg-container">
      <input
        type="text"
        v-model="userName"
        placeholder="Введите ваше имя"
        class="input-msg-container__input"
      >
      <button @click="approve" class="input-msg-container__send-btn">Подтвердить</button>
    </div>
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
        this.$router.push('/rooms')
      }
    }
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

.input-msg-container {
  display: flex;
  width: 500px;
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
.input-msg-container__input::placeholder {
  color: #ccc;
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
