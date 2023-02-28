// Get the circle element
const circle = document.getElementById('circle');

// Add a mousedown event listener to the document
document.addEventListener('mousedown', function(event) {
  // Show the circle
  circle.style.display = 'block';

  // Generate a random color
  const randomColor = getRandomColor();

  // Set the background color of the circle element to the random color
  circle.style.backgroundColor = randomColor;

  // Move the circle to the cursor position
  circle.style.left = event.clientX - (circle.offsetWidth / 2) + 'px';
  circle.style.top = event.clientY - (circle.offsetHeight / 2) + 'px';

  // Add a mousemove event listener to the document
  document.addEventListener('mousemove', moveCircle);
});

// Add a mouseup event listener to the document
document.addEventListener('mouseup', function() {
  // Hide the circle
  circle.style.display = 'none';

  // Remove the mousemove event listener from the document
  document.removeEventListener('mousemove', moveCircle);
});

// Define the moveCircle function
function moveCircle(event) {
  // Move the circle to the cursor position
  circle.style.left = event.clientX - (circle.offsetWidth / 2) + 'px';
  circle.style.top = event.clientY - (circle.offsetHeight / 2) + 'px';
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
