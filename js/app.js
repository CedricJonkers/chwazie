const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const startButton = document.getElementById('startButton');

let touchPoints = [];

screen1.addEventListener('touchstart', handleTouch);
screen2.addEventListener('touchstart', handleTouch);
screen1.addEventListener('click', handleTouch);
screen2.addEventListener('click', handleTouch);

function handleTouch(event) {
  const touchX = event.pageX - event.target.offsetLeft;
  const touchY = event.pageY - event.target.offsetTop;
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.left = touchX + 'px';
  circle.style.top = touchY + 'px';
  event.target.appendChild(circle);
  touchPoints.push({x: touchX, y: touchY});
}

startButton.addEventListener('click', startGame);

function startGame() {
  const winningIndex = Math.floor(Math.random() * touchPoints.length);
  const winningTouch = touchPoints[winningIndex];
  const winningCircle = document.createElement('div');
  winningCircle.classList.add('circle', 'highlight');
  winningCircle.style.left = winningTouch.x + 'px';
  winningCircle.style.top = winningTouch.y + 'px';
  screen1.appendChild(winningCircle);
  screen2.appendChild(winningCircle.cloneNode(true));
}
