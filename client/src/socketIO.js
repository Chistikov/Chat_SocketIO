import { io } from "socket.io-client";

export function createSocketIOConnecton() {
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ['websocket']
  }
  const socket = io("http://localhost:3000/", options);
  console.log(socket);
  
  return socket
}