
const chargeLevelElement = document.getElementById("charge-level");
const chargeElement = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");
let dataArray;
let value;
let val = 100;
let hrs = 23;
let mins = 59;

function  updateLevelInfo(val,remBtTime) {
  let batteryLevel = val + "%";
  chargeElement.style.width = batteryLevel;
  chargeLevelElement.textContent = batteryLevel;
  // chargingTimeRef.innerText = remBtTime;
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
  let remainingBattTime = calculateRemainingTime( value);
  updateLevelInfo(val,remainingBattTime);
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

function calculateRemainingTime(currentVoltage) {

  const batteryCapacity = 2000; // in mAh
const currentConsumption = 1000; // in mA (milliamps)

const minVoltageThreshold = 1
if (currentVoltage < minVoltageThreshold) {
  return "0 hr and 0 min remaining";
}

  // Calculate remaining capacity based on voltage
  const remainingCapacity = (currentVoltage / 8.4) * batteryCapacity;

  // Calculate remaining time
  const remainingTimeHours = remainingCapacity / currentConsumption;

  // Convert remaining time to hours and minutes
  const hours = Math.floor(remainingTimeHours);
  const minutes = Math.round((remainingTimeHours - hours) * 60);

// this is to avoid the noise 
if(hours<hrs){
  hrs = hours
}
if(minutes<mins){
  mins = minutes
}
 // Create log message

 const logMessage = ` ${hrs} hr and ${mins} min remaining`;

 // Return the log message
//  return logMessage;
}


    // Function to handle window resize
    window.addEventListener('resize', () => {
      const iframes = document.querySelectorAll('iframe');
      const containerWidth = document.querySelector('.container').offsetWidth;
      const containerHeight = document.querySelector('.container').offsetHeight;

      iframes.forEach(iframe => {
        iframe.style.width = containerWidth / 2 + 'px';
        iframe.style.height = containerHeight / 2 + 'px';
      });
    });

    // Function to initially center the iframes
    function centerIframes() {
      const iframes = document.querySelectorAll('iframe');
      const containerWidth = document.querySelector('.container').offsetWidth;
      const containerHeight = document.querySelector('.container').offsetHeight;

      iframes.forEach(iframe => {
        iframe.style.width = containerWidth / 2 + 'px';
        iframe.style.height = containerHeight / 2 + 'px';
      });
    }

    // Call the centering function initially and after a delay to ensure proper centering
    centerIframes();
    setTimeout(centerIframes, 500);