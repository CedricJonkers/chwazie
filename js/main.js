const users = document.querySelectorAll('.user');

function pickRandomFinger() {
  const fingers = ['thumb', 'index finger', 'middle finger', 'ring finger', 'pinky'];
  const randomIndex = Math.floor(Math.random() * fingers.length);
  return fingers[randomIndex];
}

users.forEach(user => {
  const button = user.querySelector('button');
  const result = user.querySelector('.result');
  button.addEventListener('touchstart', function(event) {
    event.preventDefault();
    const finger = pickRandomFinger();
    result.innerHTML = `You picked ${finger}`;
  });
  button.addEventListener('touchmove', function(event) {
    event.preventDefault();
  });
  button.addEventListener('touchend', function(event) {
    event.preventDefault();
  });
});
