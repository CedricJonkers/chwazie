const touchArea = document.getElementById('touch-area');

touchArea.addEventListener('touchstart', function(event) {
  event.preventDefault();
  const touch = event.touches[0];
  touchArea.innerHTML = `You're using finger ${touch.identifier}`;
});

touchArea.addEventListener('touchmove', function(event) {
  event.preventDefault();
});

touchArea.addEventListener('touchend', function(event) {
  event.preventDefault();
  touchArea.innerHTML = `Touch the screen to see which finger you're using`;
});
