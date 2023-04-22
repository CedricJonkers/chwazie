const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

let users = {};

io.on('connection', socket => {
  // Add new user to the list of connected users
  users[socket.id] = {
    x: 0,
    y: 0,
    color: getRandomColor()
  };

  // Notify all clients that a new user has joined
  io.emit('user-joined', users);

  // Handle mouse down events
  socket.on('draw-circle', coords => {
    users[socket.id].x = coords.x;
    users[socket.id].y = coords.y;
    // Notify all clients to draw a new circle 
    io.emit('draw-circle', {
      x: coords.x,
      y: coords.y, 
      color: users[socket.id].color,
      userId: socket.id
    });
  });

  // Handle mouse move events
  socket.on('move-circle', coords => {
    users[socket.id].x = coords.x;
    users[socket.id].y = coords.y;
    // Notify all clients to draw a new circle
    io.emit('draw-circle', {
      x: coords.x,
      y: coords.y,
      color: users[socket.id].color,
      userId: socket.id
    });
  });

  socket.on('choose-winner', () => {
    chooseRandomUser();
  });

  // Handle mouse up events
  socket.on('stop-drawing', () => {
    // Notify all clients to stop drawing
    delete users[socket.id];
    console.log(Object.keys(users).length);
    io.emit('stop-drawing', socket.id);
  });
    

  // Handle socket disconnection events
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    // Remove the user from the list of connected users
    delete users[socket.id];

    // Notify all clients that a user has left
    io.emit('user-left', socket.id);
  });
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function chooseRandomUser() {
  if (Object.keys(users).length >= 2) {
    setTimeout(() => {      
    const userIds = Object.keys(users);
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    console.log('Random user id:', randomUserId);
    io.emit('winner-chosen', randomUserId),
    5000});
  } else {
    console.log('Not enough users to choose a winner');
  }
}


server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
