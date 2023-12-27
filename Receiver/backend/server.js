const express = require("express");
const http = require("http");
const apiRoutes = require('./src/routes/api');
const WebSocket = require("ws");
const { SerialPort } = require("serialport");
const logger = require("./src/utils/logger");
const { ReadlineParser } = require("@serialport/parser-readline");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const parser = new ReadlineParser({ delimiter: "\n" });

app.use('/api', apiRoutes); 
// to call use
// http://localhost:3000/api/register/register
// http://localhost:3000/api/login/login
server.listen(3000, function () {
  logger.info("Server is running on port 3000.");
});

var serialport = new SerialPort({
  path: "/dev/ttyACM1",
  baudRate: 9600
});

serialport.open((err) => {
  if (err) {
    // console.log("Error opening the port" + err.message);
  }
});

serialport.pipe(parser);

const outputStream = fs.createWriteStream("output.csv", { flags: "a" });

parser.on("data", (data) => {
  const line = data.toString().trim();
  outputStream.write(`${line}\n`);

  // Loop through connected WebSocket clients and send the data to all of them
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const datas = data.toString();
      // console.log("Serial data");
      console.log(datas);
      client.send(datas);
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