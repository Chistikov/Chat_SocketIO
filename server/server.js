const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const actions = require("../actions.json")

const PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send("works");
});

io.on('connection', (socket) => {
  socket.emit(actions.SUCCESS_CONNECTION, {
    msg: `=== Connection is ready (socket id: ${socket.id}) ===`
  })
});

server.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});