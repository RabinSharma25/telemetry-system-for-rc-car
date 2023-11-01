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

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

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

// Passing the serial data from server to client using sockets 

/*
The parser.on() method is used to add an event listener to an event emitter in Node.js. It allows you to specify a function (a callback) that should be executed when a specific event is emitted by the event emitter. Here's a breakdown of how it works:

Event Emitter: In the context of your code, the parser is an event emitter. It can emit events when certain actions or conditions occur, such as when new data is available.

Event Name: In the parser.on() method, you specify the name of the event you want to listen for. For example, in your code, the event name is "data."

Callback Function: After specifying the event name, you provide a callback function (the function to execute) that will be invoked when the specified event is emitted. This function defines what should happen when the event occurs.
*/

// Create a writable stream to append data to the CSV file
const outputStream = fs.createWriteStream(outputFilePath, { flags: 'a' });
parser.on('data', (data) => {
  const line = data.toString().trim(); // Convert the incoming data to a string

  // Log the data (optional)
  // console.log(line);

  // Append the line to the CSV file
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






