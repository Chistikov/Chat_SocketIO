import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import socket from './plugins/socketIO'

const { VUE_APP_SERVER_URL } = process.env;
alert(VUE_APP_SERVER_URL)

createApp(App)
  .use(router)
  .use(socket, {serverURL: VUE_APP_SERVER_URL})
  .mount('#app')
