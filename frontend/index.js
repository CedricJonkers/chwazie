const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isDrawing = false;
let x, y;
let color;
let socket = io("http://localhost:3000");

socket.on('user-joined', users => {
    console.log('New user joined:', users);
});

socket.on('draw-circle', data => {
    drawCircle(data.x, data.y, data.color);
  });

socket.on('user-left', users => {
    console.log('User left:', users); 
});

socket.on('move-circle', data => {
    drawCircle(data.x, data.y, data.color);
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('mousemove', moveCircle);
canvas.addEventListener('touchmove', moveCircle);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(event) {
    isDrawing = true;
    color = getRandomColor();
    if (event.touches) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }  
  }

function moveCircle(event) {
    if (!isDrawing) {
        return;
    }

    if (event.touches) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }

    clearCanvas();
    drawCircle(x, y, color);
    socket.emit('draw-circle', { x, y, color, userId: socket.id });
}

function stopDrawing(event) {
    isDrawing = false;
    clearCanvas();
    socket.emit('stop-drawing');
}

function drawCircle(x, y, color) {
    const radius = 30;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}