/******* this is our backend server *******/
const express = require("express");
const http = require("http");
const apiRoutes = require('./src/routes/api');
const WebSocket = require("ws");
const { SerialPort } = require("serialport");
const logger = require("./src/utils/logger");
const { ReadlineParser } = require("@serialport/parser-readline");
const fs = require("fs");
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const parser = new ReadlineParser({ delimiter: "\n" });
const {Worker,isMainThread} = require("worker_threads");
const bodyParser = require("body-parser");

const threadFilePath = './src/ML-Model/model.js'; // path to the ml-model thread

const worker = new Worker(threadFilePath);
let accuracy = 50;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow access from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
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



if(isMainThread){
worker.on("message",(dta)=>{
  // console.log("this is a mango");
  accuracy = dta.accu;
})
}

parser.on("data", (data) => {

  outputStream.write(`${data}\n`);
  worker.postMessage({ row:data });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const datas = data.toString();
      let res = datas.slice(0, -1); // remove the last new line character 
      res = res+","+accuracy +"\n";
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


