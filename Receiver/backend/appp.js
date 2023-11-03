// To set up routes 
const express = require("express");
const http = require("http");
// For serial communication from arduino to our server
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const fs = require('fs');
// For client server communication 
var io = require("socket.io").Server;


const outputFilePath = 'output.csv';


// creating objects
const app = express();
const server = http.createServer(app);
var socketIO = new io(server);

app.use(express.static("client"));
const parser = new ReadlineParser({ delimiter: '\n' });
server.listen(3000, function () {
  console.log("Server is running on port 3000.");
})

// Getting serial data from arduino
var serialport = new SerialPort({
  path: "/dev/ttyUSB0",
  baudRate: 9600
});

serialport.open((err) => {
  if (err) {
    console.log("error opening the port" + err.message);
  }
});

serialport.pipe(parser);

// Create a writable stream to append data to the CSV file
const outputStream = fs.createWriteStream(outputFilePath, { flags: 'a' });
parser.on('data', (data) => {
  const line = data.toString().trim(); // Convert the incoming data to a 
  outputStream.write(`${line}\n`);
});



parser.on("data", (data) => {
  var datas = data.toString();
  socketIO.emit("message", datas);
  // console.log(datas);
});

// Handle errors and close the output stream when the program exits
process.on('exit', () => {
  outputStream.end();
  console.log('CSV file closed');
});

