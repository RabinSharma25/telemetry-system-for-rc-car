
const chargeLevelElement = document.getElementById("charge-level");
const chargeElement = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");
let dataArray;
let value;


function  updateLevelInfo(val) {
  let batteryLevel = val + "%";
  chargeElement.style.width = batteryLevel;
  chargeLevelElement.textContent = batteryLevel;
  chargingTimeRef.innerText = "1 hr and 21 min remaining";
}

// updateLevelInfo(56);
// socket.
const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("message", (event) => {
  event.preventDefault(); // Prevent the default behavior
  dataArray = event.data.split(',');
  console.log(dataArray);
  value = parseFloat(dataArray[5]);
  // console.log(value);
  updateLevelInfo(value);
});

