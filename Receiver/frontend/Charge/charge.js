
const chargeLevelElement = document.getElementById("charge-level");
const chargeElement = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");
let dataArray;
let value;
let val = 100;

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
  value = parseFloat(dataArray[6]);
  let mappedValue = mapRange((value-6), 0, 2.4, 0, 100);
  if(mappedValue<val){
    val = mappedValue;
  }
  updateLevelInfo(val);
});

function mapRange(value, fromMin, fromMax, toMin, toMax) {
  // Ensure the value is within the from range
  value = Math.min(Math.max(value, fromMin), fromMax);

  // Calculate the percentage of the value within the from range
  const percentage = (value - fromMin) / (fromMax - fromMin);

  // Map the percentage to the to range
  const mappedValue = Math.round(percentage * (toMax - toMin) + toMin);

  return mappedValue;
}

