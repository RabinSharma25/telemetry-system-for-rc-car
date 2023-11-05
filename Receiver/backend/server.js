

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const parser = new ReadlineParser({ delimiter: "\n" });

server.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

var serialport = new SerialPort({
  path: "/dev/ttyUSB0",
  baudRate: 9600
});

serialport.open((err) => {
  if (err) {
    console.log("Error opening the port" + err.message);
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
      console.log("Serial data");
      console.log(datas);
      client.send(datas);
    }
  });
});

// wss.on("connection", (ws) => {
//   // Handle WebSocket connections here if needed
// });

process.on("exit", () => {
  outputStream.end();
  console.log("CSV file closed");

});