import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import socket from './plugins/socketIO'

createApp(App)
  .use(router)
  .use(socket, {serverURL: "http://localhost:3000/"})
  .mount('#app')
