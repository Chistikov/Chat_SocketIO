const express = require('express');
const app = express();
const http = require('http');
var cors = require('cors')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { v4 } = require('uuid')

const actions = require("../actions.json");
const { on } = require('events');

const PORT = process.env.PORT || 3000

app.use(cors({
  origin: '*'
}));

const rooms = {
  123: {
    name: 'Комната для общения 1',
  },
  124: {
    name: 'Комната для общения 2',
  },
}
const users = []

app.get('/get-rooms-list', (req, res) => {
  res.send(rooms);
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

  socket.on(actions.JOIN_TO_ROOM, connectionData => {
    console.warn(connectionData)
    socket.join(connectionData.roomId)
    socket.to(connectionData.roomId).emit(actions.NOTIFY_TO_ROOM, `User ${connectionData.userName} (${connectionData.userId}) connected!`)
  })

  socket.on(actions.CHAT_MSG, chatMsg => {
    // TODO: set up msg to stack
    console.log(chatMsg)
    socket.to(chatMsg.chatId).emit(actions.CHAT_MSG, {
      userName: chatMsg.userName,
      msg: chatMsg.msg
    })
  })
});

server.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});