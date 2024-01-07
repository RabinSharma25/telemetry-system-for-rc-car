const express = require("express");
const http = require("http");
const apiRoutes = require('./src/routes/api');
const WebSocket = require("ws");
const { SerialPort } = require("serialport");
const logger = require("./src/utils/logger");
const { ReadlineParser } = require("@serialport/parser-readline");
const fs = require("fs");
const mlModel = require("./src/ML-Model/model");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const parser = new ReadlineParser({ delimiter: "\n" });
const {Worker} = require("worker_threads");

const modelPath = '/home/rabin-sharma/Documents/Github/Mini-Project/Receiver/backend/src/ML-Model/onnx_model.onnx';
const inputShape = [1, 9]; // Shape for a 1D tensor with 1 row and 9 columns

const inputData = Float32Array.from([0.10,6.14,15,0.00,1,1.55,7,11,21])


const worker = new Worker('/home/rabin-sharma/Documents/Github/Mini-Project/Receiver/backend/src/ML-Model/model.js')
let accuracy = 50;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow access from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/api', apiRoutes); // to call use http://localhost:3000/api/users/users
server.listen(3000, function () {
  logger.info("Server is running on port 3000.");
});

var serialport = new SerialPort({
  path: "/dev/ttyACM0",
  baudRate: 9600
});

serialport.open((err) => {
  if (err) {
    // console.log("Error opening the port" + err.message);
  }
});

serialport.pipe(parser);

const outputStream = fs.createWriteStream("output.csv", { flags: "a" });

worker.on("msg",(dta)=>{
  console.log("this is a mango");
  accuracy = dta;
})
parser.on("data", (data) => {
  const line = data.toString().trim();
  outputStream.write(`${line}\n`);
  // Loop through connected WebSocket clients and send the data to all of them
  // console.log(line);
  worker.postMessage({ line });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const datas = data.toString();
      
      // console.log("Serial data");
      // console.log(datas);
      // mlModel.runInference(modelPath, inputData,inputShape);
      let res = datas+ "," +accuracy; // causing error because of the new line /n character 
      console.log(res);
      client.send(res);

    }
  });
});


process.on("exit", () => {
  outputStream.end();
  console.log("CSV file closed");

});





/*
to kill a process using the port number
lsof -i :3000 // this command will give you pid of process running in port 3000
kill -9 pid

*/


