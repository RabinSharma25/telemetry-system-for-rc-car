
 updateValues();
 function updateValues(){
 let roll=0;
 let pitch =0; 
 let yaw =0;
 let long=0;
 let lati =0;
 let batrc =0;
 let battel = 0;
 let temp = 0;
 let velocity =0;
 let acc=0;

 const socket = new WebSocket("ws://localhost:3000");
 socket.addEventListener("message", (event) => {
  event.preventDefault();
  dataArray = event.data.split(',');
  console.log(dataArray);

  // Parse each value from the received data
   roll = parseFloat(dataArray[0]);
   pitch = parseFloat(dataArray[1]);
   yaw = parseFloat(dataArray[2]);
   long = parseFloat(dataArray[3]);
   lati = parseFloat(dataArray[4]);
   batrc = parseFloat(dataArray[5]);
   battel = parseFloat(dataArray[6]);
   temp = parseFloat(dataArray[7]);
   velocity = parseFloat(dataArray[8]);
   acc = parseFloat(dataArray[9]);
   updateAcc(acc);
   updateAHRS(roll,pitch,yaw);
   updateBatteries(batrc,battel);
   updateTemp(temp);
   updateVelocity(velocity);
   updateGPS(long,lati);
 });
// gps
const gps = document.getElementById("chart6").getContext('2d');
const GPSGraph = new Chart(gps, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
    {
        label: 'Longitude',
        data: [],
        borderColor: "black",
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false // Hide the point style (no markers)
      },
      {
        label: 'Latitude',
        data: [],
        borderColor: 'orange',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false // Hide the point style (no markers)
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        reverse: false

      },
      x: {
        reverse: true,
        beginAtZero: false
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Line Graph for GPS' // Chart title
      },
      legend: {
          display: true,
          labels: {
              font: {
                  size: 14 // Legend label font size
              }
          }
      },
      tooltip: {
          enabled: true,
          backgroundColor: 'black', // Tooltip background color
          titleColor: 'white', // Tooltip title color
          bodyColor: 'white' // Tooltip body text color
      }
  }
  }
});
function updateGPS(value1,value2) {
  // Extract the label for the graph (empty for demonstration)
  const label = "";

  // Check and remove the oldest data point if it exceeds the limit
  if (GPSGraph.data.labels.length >= 100) {
    GPSGraph.data.labels.shift();
    GPSGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }

  // Update the graph with new data for each dataset
  GPSGraph.data.labels.push(label);
  GPSGraph.data.datasets[0].data.push(value1);
  GPSGraph.data.datasets[1].data.push(value2);
  GPSGraph.update('none');
}
// AHRS GRAPH
const ahrs = document.getElementById("chart1").getContext('2d');
const AHRSGraph = new Chart(ahrs, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Roll',
        data: [],
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false // Hide the point style (no markers)
      },
      {
        label: 'Pitch',
        data: [],
        borderColor: 'black',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false // Hide the point style (no markers)
      },
      {
        label: 'Yaw',
        data: [],
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false // Hide the point style (no markers)
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        reverse: true,
        beginAtZero: false

      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Line Graph for Orientation' // Chart title
      },
      legend: {
          display: true,
          labels: {
              font: {
                  size: 14 // Legend label font size
              }
          }
      },
      tooltip: {
          enabled: true,
          backgroundColor: 'black', // Tooltip background color
          titleColor: 'white', // Tooltip title color
          bodyColor: 'white' // Tooltip body text color
      }
  }
  }
});


function updateAHRS(value1, value2, value3) {
  // Extract the label for the graph (empty for demonstration)
  const label = "";
  // Check and remove the oldest data point if it exceeds the limit
  if (AHRSGraph.data.labels.length >= 100) {
    AHRSGraph.data.labels.shift();
    AHRSGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }
  AHRSGraph.data.labels.push(label);
  AHRSGraph.data.datasets[0].data.push(value1);
  AHRSGraph.data.datasets[1].data.push(value2);
  AHRSGraph.data.datasets[2].data.push(value3);
  AHRSGraph.update('none');
}
}

// batteries ----graph 2
  const batteries = document.getElementById("chart2").getContext('2d');
const BatteriesGraph = new Chart(batteries, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
    label: 'RC Car',
        data: [],
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false // Hide the point style (no markers)
      },
      {
        label: 'Telemetry Module',
        data: [],
        borderColor: 'yellow',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false // Hide the point style (no markers)
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        reverse: true,
        beginAtZero: false
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Line Graph for Batteries' // Chart title
      },
      legend: {
          display: true,
          labels: {
              font: {
                  size: 14 // Legend label font size
              }
          }
      },
      tooltip: {
          enabled: true,
          backgroundColor: 'black', // Tooltip background color
          titleColor: 'white', // Tooltip title color
          bodyColor: 'white' // Tooltip body text color
      }
  }
  }
});

function updateBatteries(value1,value2) {
  const label = "";
  if (BatteriesGraph.data.labels.length >= 100) {
    BatteriesGraph.data.labels.shift();
    BatteriesGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }
  BatteriesGraph.data.labels.push(label);
  BatteriesGraph.data.datasets[0].data.push(value1);
  BatteriesGraph.data.datasets[1].data.push(value2);
  BatteriesGraph.update('none');
}

const temp = document.getElementById("chart3").getContext('2d');
const TempGraph = new Chart(temp, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Temperature',
        data: [],
        borderColor: 'purple',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false// Hide the point style (no markers)
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        reverse: true,
        beginAtZero: false

      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Line Graph for Temperature' // Chart title
      },
      legend: {
          display: true,
          labels: {
              font: {
                  size: 14 // Legend label font size
              }
          }
      },
      tooltip: {
          enabled: true,
          backgroundColor: 'black', // Tooltip background color
          titleColor: 'white', // Tooltip title color
          bodyColor: 'white' // Tooltip body text color
      }
  }
  }
});

function updateTemp(value) {
  // Extract the label for the graph (empty for demonstration)
const label = "";
  // Check and remove the oldest data point if it exceeds the limit
  if (TempGraph.data.labels.length >= 100) {
      TempGraph.data.labels.shift();
      TempGraph.data.datasets.forEach(dataset => {
        dataset.data.shift();
   });
  }
  TempGraph.data.labels.push(label);
  TempGraph.data.datasets[0].data.push(value);

  // TempGraph.reverse();
  TempGraph.update('none');
}

// accuracy ---graph 4
  const acc = document.getElementById("chart4").getContext('2d');
const AccGraph = new Chart(acc, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Accuracy',
        data: [],
        borderColor: 'lightgreen',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false, // Hide the point style (no markers)
        tension:0.1
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        reverse: true,
        beginAtZero: false

      }
    },
    elements: {
      point: {
          radius: 6 // Adjust the width of each data point
      }
  },
  plugins: {
    title: {
        display: true,
        text: 'Line Graph for Accuracy' // Chart title
    },
    legend: {
        display: true,
        labels: {
            font: {
                size: 14 // Legend label font size
            }
        }
    },
    tooltip: {
        enabled: true,
        backgroundColor: 'black', // Tooltip background color
        titleColor: 'white', // Tooltip title color
        bodyColor: 'white' // Tooltip body text color
    }
}
  }
});
function updateAcc(value) {
  // Extract the label for the graph (empty for demonstration)
  const label = "";

  // Check and remove the oldest data point if it exceeds the limit
  if (AccGraph.data.labels.length >= 100) {
    AccGraph.data.labels.shift();
    AccGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }
  AccGraph.data.labels.push(label);
  AccGraph.data.datasets[0].data.push(value);
  AccGraph.update('none');
}

// velocity --graph 5
  const vel = document.getElementById("chart5").getContext('2d');
const VelGraph = new Chart(vel, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Velocity',
        data: [],
        borderColor: 'violet',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Set point radius to 0 to hide markers
        pointStyle: false // Hide the point style (no markers)
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        reverse: true,
        beginAtZero: false

      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Line Graph for Velocity' // Chart title
      },
      legend: {
          display: true,
          labels: {
              font: {
                  size: 14 // Legend label font size
              }
          }
      },
      tooltip: {
          enabled: true,
          backgroundColor: 'black', // Tooltip background color
          titleColor: 'white', // Tooltip title color
          bodyColor: 'white' // Tooltip body text color
      }
  }
  }
});

function updateVelocity(value) {
  // Extract the label for the graph (empty for demonstration)
  const label = "";

  // Check and remove the oldest data point if it exceeds the limit
  if (VelGraph.data.labels.length >= 100) {
    VelGraph.data.labels.shift();
    VelGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }

  // Update the graph with new data for each dataset
  VelGraph.data.labels.push(label);
  VelGraph.data.datasets[0].data.push(value);
  VelGraph.update('none');
}



const canvas = document.getElementById("chart1");
if (canvas) {
canvas.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});
}


// pop up
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LLWL5N9CSM');

dragElement(document.getElementById("navigation"));

function dragElement(elmnt) {
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
if (document.getElementById(elmnt.id + "header")) {
  // if present, the header is where you move the DIV from:
  document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
} else {
  // otherwise, move the DIV from anywhere inside the DIV:
  elmnt.onmousedown = dragMouseDown;
}

function dragMouseDown(e) {
//   e = e || window.event;
  e.preventDefault();
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;
}

function elementDrag(e) {
//   e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  // set the element's new position:
  elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
  // stop moving when mouse button is released:
  document.onmouseup = null;
  document.onmousemove = null;
}
}
