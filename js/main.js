const userOneCanvas = document.getElementById('user-one-canvas');
const userOneButton = document.getElementById('user-one-button');
const userTwoCanvas = document.getElementById('user-two-canvas');
const userTwoButton = document.getElementById('user-two-button');
const resultDiv = document.getElementById('result');

let userOneFinger = null;
let userTwoFinger = null;

function drawCanvas(canvas, color) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 4, 0, 2 * Math.PI);
  ctx.fill();
}

function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function detectTouch(canvas, finger) {
  canvas.addEventListener('touchstart', function(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const radius = canvas.width / 4;
    const distance = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2));
    if (distance < radius) {
      drawCanvas(canvas, 'green');
      finger = true;
      checkReady();
    }
  });
}

function checkReady() {
  if (userOneFinger && userTwoFinger) {
    userOneButton.disabled = true;
    userTwoButton.disabled = true;
    const result = Math.floor(Math.random() * 2) + 1;
    if (result === 1) {
      resultDiv.innerText = 'User 1 wins!';
    } else {
      resultDiv.innerText = 'User 2 wins!';
    }
    resultDiv.style.display = 'block';
  }
}

detectTouch(userOneCanvas, userOneFinger);
detectTouch(userTwoCanvas, userTwoFinger);

userOneButton.addEventListener('click', function() {
  userOneFinger = true;
  drawCanvas(userOneCanvas, 'green');
  userOneButton.disabled = true;
  checkReady();
});

userTwoButton.addEventListener('click', function() {
  userTwoFinger = true;
  drawCanvas(userTwoCanvas, 'green');
  userTwoButton.disabled = true;
  checkReady();
});
