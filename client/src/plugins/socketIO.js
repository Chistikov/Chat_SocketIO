import { io } from "socket.io-client";

export default {
  install(app, options) {
    const config = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ['websocket']
    }
    const socket = io(options.serverURL, config);
    app.config.globalProperties.$socket = socket
  }
}