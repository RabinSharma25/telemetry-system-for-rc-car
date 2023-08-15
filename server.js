// To set up routes 
const express = require("express");
const http = require("http");
// For serial communication from arduino to our server
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
// For client server communication 
var io = require("socket.io").Server;

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
  path: "/dev/ttyACM0",
  baudRate: 9600
});

serialport.open((err) => {
  if (err) {
    console.log("error opening the port" + err.message);
  }
});

serialport.pipe(parser);

// Passing the serial data from server to client using sockets 
parser.on("data", (data) => {
  var datas = data.toString();
  socketIO.emit("message", datas);
  // console.log(datas);
});








