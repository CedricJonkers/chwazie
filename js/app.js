// Get the circle element
const circle = document.getElementById('circle');

// Add a touchstart event listener to the document
document.addEventListener('touchstart', function (event) {

  // Show the circle
  circle.style.display = 'block';

  // Generate a random color
  const randomColor = getRandomColor();

  // Set the background color of the circle element to the random color
  circle.style.backgroundColor = randomColor;

  // Move the circle to the touch position
  circle.style.left = event.touches[0].clientX - (circle.offsetWidth / 2) + 'px';
  circle.style.top = event.touches[0].clientY - (circle.offsetHeight / 2) + 'px';

  // Add a touchmove event listener to the document
  document.addEventListener('touchmove', moveCircle, { passive: false });

  // Add a touchend event listener to the document
  document.addEventListener('touchend', function () {
    // Hide the circle
    circle.style.display = 'none';

    // Remove the touchmove event listener from the document
    document.removeEventListener('touchmove', moveCircle);

    // Remove the touchend event listener from the document
    document.removeEventListener('touchend', arguments.callee);
  }, { once: true });
});

// Define the moveCircle function
function moveCircle(event) {
  // Prevent the default touch behavior
  event.preventDefault();

  // Move the circle to the touch position
  circle.style.left = event.touches[0].clientX - (circle.offsetWidth / 2) + 'px';
  circle.style.top = event.touches[0].clientY - (circle.offsetHeight / 2) + 'px';
}

// Define the getRandomColor function
function getRandomColor() {
  // Generate a random integer between 0 and 255 for each RGB component
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Construct the color string in RGB format
  const color = `rgb(${red}, ${green}, ${blue})`;

  // Return the color string
  return color;
}