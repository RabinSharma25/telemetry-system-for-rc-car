  const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("message", (event) => {
  event.preventDefault(); // Prevent the default behavior
  dataArray = event.data.split(',');
  console.log(dataArray);
  value = parseFloat(dataArray[7]);
  updateValue(value);
});

function updateValue(value) {
  const displayValue = document.getElementById('displayValue');
  displayValue.textContent = value;

  const icon = document.getElementById('icon');
  let iconPath = '';

  if (value >= -45 && value <= 4) {
    iconPath = '../user/Assets/01.png'; // Replace with your icon path for this range
  } else if (value >= 6 && value <= 14) {
    iconPath = '../user/Assets/02.png'; // Replace with your icon path for this range
  } else if (value >= 15 && value <= 24) {
    iconPath = '../user/Assets/03.png'; // Replace with your icon path for this range
  } else if (value >= 25 && value <= 34) {
    iconPath = '../user/Assets/04.png'; // Replace with your icon path for this range
  } else if (value >= 35 && value <= 44) {
    iconPath = '../user/Assets/05.png'; // Replace with your icon path for this range
  } else if (value >= 45 && value <= 55) {
    iconPath = '../user/Assets/06.png'; // Replace with your icon path for this range
  }else if (value >= 56) {
    iconPath = '../user/Assets/07.png'; // Replace with your icon path for this range
  }
  icon.src = iconPath;
}