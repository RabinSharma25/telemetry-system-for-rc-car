 // Function to generate random data for the graphs
 const socket = new WebSocket("ws://localhost:3000");

 // roll pitch and yaw---- graph 1
 function AHRS(canvasId) {
   const ctx = document.getElementById(canvasId).getContext('2d');
 const liveChart = new Chart(ctx, {
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

 // When a message is received through the WebSocket, update the graph
 socket.addEventListener("message", (event) => {
   event.preventDefault();
   dataArray = event.data.split(',');
   console.log(dataArray);

   // Parse each value from the received data
   const value1 = parseFloat(dataArray[0]);
   const value2 = parseFloat(dataArray[1]);
   const value3 = parseFloat(dataArray[2]);

   // Update the graph with new data
   updateChart(value1, value2, value3);
 });

 function updateChart(value1, value2, value3) {
   // Extract the label for the graph (empty for demonstration)
   const label = "";
   // Check and remove the oldest data point if it exceeds the limit
   if (liveChart.data.labels.length >= 50) {
     liveChart.data.labels.shift();
     liveChart.data.datasets.forEach(dataset => {
       dataset.data.shift();
     });
   }
   liveChart.data.labels.push(label);
   liveChart.data.datasets[0].data.push(value1);
   liveChart.data.datasets[1].data.push(value2);
   liveChart.data.datasets[2].data.push(value3);
   liveChart.update();
 }
 }

 // batteries ----graph 2
 function Batteries(canvasId) {
   const ctx = document.getElementById(canvasId).getContext('2d');
 const liveChart = new Chart(ctx, {
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

 // When a message is received through the WebSocket, update the graph
 socket.addEventListener("message", (event) => {
   event.preventDefault();
   dataArray = event.data.split(',');
   console.log(dataArray);

   // Parse each value from the received data
   const value1 = parseFloat(dataArray[5]);
   const value2 = parseFloat(dataArray[6]);



   // Update the graph with new data
   updateChart(value1,value2);
 });

 function updateChart(value1,value2) {
   // Extract the label for the graph (empty for demonstration)
   const label = "";

   // Check and remove the oldest data point if it exceeds the limit
   if (liveChart.data.labels.length >= 50) {
     liveChart.data.labels.shift();
     liveChart.data.datasets.forEach(dataset => {
       dataset.data.shift();
     });
   }

   // Update the graph with new data for each dataset
   liveChart.data.labels.push(label);
   liveChart.data.datasets[0].data.push(value1);
   liveChart.data.datasets[1].data.push(value2);

   liveChart.update();
 }
 }
 // temperature ---graph 3
 function Temperature(canvasId) {
   const ctx = document.getElementById(canvasId).getContext('2d');
 const liveChart = new Chart(ctx, {
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

 // When a message is received through the WebSocket, update the graph
 socket.addEventListener("message", (event) => {
   event.preventDefault();
   dataArray = event.data.split(',');
   console.log(dataArray);

   // Parse each value from the received data
   const value = parseFloat(dataArray[7]);


   // Update the graph with new data
   updateChart(value);
 });

 function updateChart(value) {
   // Extract the label for the graph (empty for demonstration)
   const label = "";

   // Check and remove the oldest data point if it exceeds the limit
   if (liveChart.data.labels.length >= 50) {
     liveChart.data.labels.shift();
     liveChart.data.datasets.forEach(dataset => {
       dataset.data.shift();
     });
   }

   // Update the graph with new data for each dataset
   liveChart.data.labels.push(label);
   liveChart.data.datasets[0].data.push(value);
   liveChart.update();
 }
 }
// accuracy ---graph 4
 function Accuracy(canvasId) {
   const ctx = document.getElementById(canvasId).getContext('2d');
 const liveChart = new Chart(ctx, {
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
       // y: {
       //   beginAtZero: true
       // }
     }
   }
 });

 // When a message is received through the WebSocket, update the graph
 socket.addEventListener("message", (event) => {
   event.preventDefault();
   dataArray = event.data.split(',');
   console.log(dataArray);

   // Parse each value from the received data
   const value = parseFloat(dataArray[9]);


   // Update the graph with new data
   updateChart(value);
 });

 function updateChart(value) {
   // Extract the label for the graph (empty for demonstration)
   const label = "";

   // Check and remove the oldest data point if it exceeds the limit
   if (liveChart.data.labels.length >= 50) {
     liveChart.data.labels.shift();
     liveChart.data.datasets.forEach(dataset => {
       dataset.data.shift();
     });
   }

   // Update the graph with new data for each dataset
   liveChart.data.labels.push(label);
   liveChart.data.datasets[0].data.push(value);
   liveChart.update();
 }
 }
// velocity --graph 5
 function Velocity(canvasId) {
   const ctx = document.getElementById(canvasId).getContext('2d');
 const liveChart = new Chart(ctx, {
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

 function updateChart(value) {
   // Extract the label for the graph (empty for demonstration)
   const label = "";

   // Check and remove the oldest data point if it exceeds the limit
   if (liveChart.data.labels.length >= 50) {
     liveChart.data.labels.shift();
     liveChart.data.datasets.forEach(dataset => {
       dataset.data.shift();
     });
   }

   // Update the graph with new data for each dataset
   liveChart.data.labels.push(label);
   liveChart.data.datasets[0].data.push(value);
   liveChart.update();
 }
 }
 // gps
 function GPS(canvasId) {
   const ctx = document.getElementById(canvasId).getContext('2d');
 const liveChart = new Chart(ctx, {
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

 // When a message is received through the WebSocket, update the graph
 socket.addEventListener("message", (event) => {
   event.preventDefault();
   dataArray = event.data.split(',');
   console.log(dataArray);

   // Parse each value from the received data
   const value1 = parseFloat(dataArray[3]);
   const value2 = parseFloat(dataArray[4]);



   // Update the graph with new data
   updateChart(value1,value2);
 });

 function updateChart(value1,value2) {
   // Extract the label for the graph (empty for demonstration)
   const label = "";

   // Check and remove the oldest data point if it exceeds the limit
   if (liveChart.data.labels.length >= 50) {
     liveChart.data.labels.shift();
     liveChart.data.datasets.forEach(dataset => {
       dataset.data.shift();
     });
   }

   // Update the graph with new data for each dataset
   liveChart.data.labels.push(label);
   liveChart.data.datasets[0].data.push(value1);
   liveChart.data.datasets[1].data.push(value2);

   liveChart.update();
 }
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