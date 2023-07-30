const express = require("express");
const http = require("http");
const{ SerialPort} = require("serialport");
const{ ReadlineParser} = require("@serialport/parser-readline");
const { Socket } = require("socket.io");


const app = express();
// https.listen(1500);
const server = http.createServer(app);
app.use(express.static("public"));
const parser = new ReadlineParser({delimiter: '\n'});


// socket.io
var io = require("socket.io").Server;
var socketIO = new io(server);

var datas;
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

server.listen(3000, function () {
  console.log("Server is running on port 3000.");
})

// var serialport = new SerialPort({
//     path: "/dev/ttyACM0",
//     baudRate: 9600
//  });
 
//  serialport.open((err)=>{
//      if(err){
//          console.log("error opening the port"+err.message);
//      }
//  });
 
//  serialport.pipe(parser);
//  parser.on("data",(data)=>{
//   datas = data.toString();
//   // console.log(datas);
//   socketIO.emit("message",datas);

//  });








