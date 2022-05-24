<template>
  <div class="app-container">
    <div class="app-container__title">chat app</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.app-container {
  max-width: 100%;
  /* background: #ccc; */
  height: 100vh;
}
.app-container__title {
  text-align: center;
  text-transform: uppercase;
  padding: 20px;
  background: #436077;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: #4a6a84;
  color: #fff
}
</style>
