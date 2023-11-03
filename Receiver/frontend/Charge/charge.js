const chargeLevel = document.getElementById("charge-level"); // shows charge level in percentage 
const charge = document.getElementById("charge"); // shows charge leven using css
const chargingTimeRef = document.getElementById("charging-time"); // shows remaining time to charge


// socket .io 
let dataArray;
// var socketIO = io();
let value;
var mess;
// socketIO.on("message", (mess) => {
// 	dataArray = mess.split(',');
//   value = parseFloat(dataArray[5]);
//   console.log(value);
//   updateLevelInfo(value);

// });

  //Updating battery level
  function updateLevelInfo(val) {
    let batteryLevel = val+"%";
    charge.style.width = batteryLevel;
    chargeLevel.textContent = batteryLevel;
    chargingTimeRef.innerText = "1 hr and 21 min remaining";
  }
// updateLevelInfo();






// const dataContainer = document.getElementById("data-container");
const socket = new WebSocket("ws://localhost:3000");

// socket.addEventListener("open", (event) => {
//   console.log("Connected to the WebSocket server");
// });

socket.addEventListener("message", (event) => {
  // const data = event.data;
  // const newDataElement = document.createElement("p");
  // newDataElement.textContent = data;
  // dataContainer.appendChild(newDataElement);

  dataArray = event.data.split(',');
  value = parseFloat(dataArray[5]);
  console.log(value);
  updateLevelInfo(value);
});

// socket.addEventListener("close", () => {
//   console.log("Connection to the WebSocket server closed");
// });
