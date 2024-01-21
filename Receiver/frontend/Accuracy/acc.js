document.body.addEventListener('dblclick', () => {
    toggleFullscreen(document.documentElement);
  });

  function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  function setCircleGradient(value) {
    const circle = document.getElementById('myCircle');
    let gradientId = '';

    // Define gradients based on different value ranges
    if (value >=0 && value <= 50) {
      gradientId = 'redGradient'; // Gradient for value range 90-100

    } else if (value > 50 && value <= 75) {
      gradientId = 'orangeGradient'; // Gradient for value range 76-90

    } else if (value > 75 && value <= 90) {
      gradientId = 'yellowGradient'; // Gradient for value range 51-75

    } else if (value > 90 && value <= 100) {
      gradientId = 'greenGradient'; // Gradient for value range 10-50

    }

    // Apply the gradient to the circle's stroke
    circle.setAttribute('stroke', `url(#${gradientId})`);
    const valueText = document.getElementById('valueText');
    valueText.textContent = value + '%';
  }

const socket = new WebSocket("ws://localhost:3000");
socket.addEventListener("message", (event) => {
event.preventDefault(); // Prevent the default behavior
dataArray = event.data.split(',');
console.log(dataArray);
value = parseFloat(dataArray[9]);
value*=100;
let value2 = value.toFixed(2); // Rounds to 2 decimal points

setCircleGradient(value2); 
});