const socket = io();

let playerNumber;
let myTurn = false;

const cells = document.querySelectorAll('.cell');

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('join');
});

socket.on('player', data => {
  playerNumber = data;
  if (playerNumber === 1) {
    document.getElementById('player').textContent = 'You are X';
  } else if (playerNumber === 2) {
    document.getElementById('player').textContent = 'You are O';
  }
});

socket.on('start', () => {
  console.log('Game started');
  myTurn = playerNumber === 1;
});

socket.on('move', data => {
  const { index, player } = data;
  cells[index].textContent = player === 1 ? 'X' : 'O';
  myTurn = playerNumber === player ? false : true;
});

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (myTurn && cell.textContent === '') {
      cell.textContent = playerNumber === 1 ? 'X' : 'O';
      socket.emit('move', { index, player: playerNumber });
      myTurn = false;
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
