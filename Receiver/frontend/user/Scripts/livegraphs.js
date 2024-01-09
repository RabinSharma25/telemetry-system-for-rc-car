 // Function to generate random data for the graphs
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
   updateAHRS(roll,pitch,yaw);
   updateBatteries(batrc,battel);
   updateTemp(temp);
   updateVelocity(velocity);
   updateGPS(long,lati);
   updateAcc(acc);
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
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Latitude',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
function updateGPS(value1,value2) {
  // Extract the label for the graph (empty for demonstration)
  const label = "";

  // Check and remove the oldest data point if it exceeds the limit
  if (GPSGraph.data.labels.length >= 50) {
    GPSGraph.data.labels.shift();
    GPSGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }

  // Update the graph with new data for each dataset
  GPSGraph.data.labels.push(label);
  GPSGraph.data.datasets[0].data.push(value1);
  GPSGraph.data.datasets[1].data.push(value2);
  GPSGraph.update();
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
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Pitch',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Yaw',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


function updateAHRS(value1, value2, value3) {
  // Extract the label for the graph (empty for demonstration)
  const label = "";
  // Check and remove the oldest data point if it exceeds the limit
  if (AHRSGraph.data.labels.length >= 50) {
    AHRSGraph.data.labels.shift();
    AHRSGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }
  AHRSGraph.data.labels.push(label);
  AHRSGraph.data.datasets[0].data.push(value1);
  AHRSGraph.data.datasets[1].data.push(value2);
  AHRSGraph.data.datasets[2].data.push(value3);
  AHRSGraph.update();
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
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Telemetry Module',
        data: [],
        borderColor: 'rgba(255, 199, 12, 1)',
        borderWidth: 2,
        fill: false
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function updateBatteries(value1,value2) {
  const label = "";
  if (BatteriesGraph.data.labels.length >= 50) {
    BatteriesGraph.data.labels.shift();
    BatteriesGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }
  BatteriesGraph.data.labels.push(label);
  BatteriesGraph.data.datasets[0].data.push(value1);
  BatteriesGraph.data.datasets[1].data.push(value2);
  BatteriesGraph.update();
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
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function updateTemp(value) {
  // Extract the label for the graph (empty for demonstration)
  const label = "";

  // Check and remove the oldest data point if it exceeds the limit
  if (TempGraph.data.labels.length >= 50) {
    TempGraph.data.labels.shift();
    TempGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }
  TempGraph.data.labels.push(label);
  TempGraph.data.datasets[0].data.push(value);
  TempGraph.update();
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
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
function updateAcc(value) {
  // Extract the label for the graph (empty for demonstration)
  const label = "";

  // Check and remove the oldest data point if it exceeds the limit
  if (AccGraph.data.labels.length >= 50) {
    AccGraph.data.labels.shift();
    AccGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }
  AccGraph.data.labels.push(label);
  AccGraph.data.datasets[0].data.push(value);
  AccGraph.update();
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
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      }
     
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// When a message is received through the WebSocket, update the graph
socket.addEventListener("message", (event) => {
  event.preventDefault();
  dataArray = event.data.split(',');
  console.log(dataArray);

  // Parse each value from the received data
  const value = parseFloat(dataArray[8]);


  // Update the graph with new data
  updateChart(value);
});

function updateVelocity(value) {
  // Extract the label for the graph (empty for demonstration)
  const label = "";

  // Check and remove the oldest data point if it exceeds the limit
  if (VelGraph.data.labels.length >= 50) {
    VelGraph.data.labels.shift();
    VelGraph.data.datasets.forEach(dataset => {
      dataset.data.shift();
    });
  }

  // Update the graph with new data for each dataset
  VelGraph.data.labels.push(label);
  VelGraph.data.datasets[0].data.push(value);
  VelGraph.update();
}




const chart1=AHRS("chart1");
const chart2=Batteries("chart2");
const chart3=Temperature("chart3");
const chart4=Accuracy("chart4");
const chart5=Velocity("chart5");
const chart6=GPS("chart6");





for (let i = 0; i <= 6; i++) {
const canvas = document.getElementById(`chart${i}`);

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
} 
