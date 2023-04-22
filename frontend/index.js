const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isDrawing = false;
let x = 0, y = 0;
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

socket.on('choose-winner', () => {
    console.log('Choose winner');
    socket.emit('choose-winner');
});

socket.on('winner-chosen', winner => {
    console.log(color)
    const winnerText = document.getElementById('winner-text');
    if (winner === socket.id) {
        const color2 = color || '#000000';
        document.body.style.backgroundColor = color2;
        winnerText.style.color = '#000000';
        winnerText.innerHTML = 'Gewonne!';
    } else {
        winnerText.innerHTML = 'verloren!';
    }
});


socket.on('stop-drawing', () => {   
    clearCircle();
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
    drawCircle(x, y, color);
    timer();
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

    drawCircle(x, y, color);
    socket.emit('draw-circle', { x, y, color, userId: socket.id });
}

function stopDrawing(event) {
    isDrawing = false;
    socket.emit('stop-drawing');
}

function drawCircle(x, y, color) {
    const radius = 30;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function clearCircle() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function timer() {
    setTimeout(chooseRandomUser, 5000);
}

function chooseRandomUser() {
    socket.emit('choose-winner');
}