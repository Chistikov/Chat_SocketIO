const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { v4 } = require('uuid')

const actions = require("../actions.json")

const PORT = process.env.PORT || 3000


const users = []

app.get('/', (req, res) => {
  res.send("works");
});

io.on('connection', (socket) => {
  socket.emit(actions.SUCCESS_CONNECTION, {
    msg: `=== Connection is ready (socket id: ${socket.id}) ===`
  })

  socket.on(actions.INITIAL_SETUP, ({userName}) => {
    const user = users.find(user => user.userName === userName);
    if (!user) {
      const uuidv4 = v4()
      const userData = {
        userName: userName,
        uuid: uuidv4,
        socket: socket
      };
      users.push(userData);
      console.log('New user', userData)
      socket.emit(actions.DISPATCH_UUID, uuidv4)
    } else {
      const foundUserByUUID = users.find(u => u.uuid === user.uuid)
      foundUserByUUID.socket = socket;
      socket.emit(actions.DISPATCH_UUID, user.uuid)
      socket.emit(actions.DISPATCH_ALL_USERS, users.map(user=> ({
        userName: user.userName,
        uuid: user.uuid,
        socketId: user.socket.id
      })))
    }
  })
});

server.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});