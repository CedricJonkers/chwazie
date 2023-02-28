const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

let players = [];

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`);

  socket.on('join', () => {
    if (players.length === 0) {
      players.push(socket);
      socket.emit('player', 1);
      console.log(`Player 1 joined`);
    } else if (players.length === 1) {
      players.push(socket);
      players[0].emit('start');
      players[1].emit('start');
      socket.emit('player', 2);
      console.log(`Player 2 joined`);
    } else {
      socket.disconnect();
      console.log(`Too many players`);
    }
  });

  socket.on('move', data => {
    const { index, player } = data;
    const otherPlayer = player === 1 ? 2 : 1;
    players[otherPlayer - 1].emit('move', { index, player });
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    players = players.filter(p => p !== socket);
    if (players.length === 1) {
      players[0].emit('player', 1);
      console.log(`Player 1 left`);
    }
  });
});
