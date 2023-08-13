const express = require("express");
const http = require("http");

const app = express();

app.use(express.static("public"));
const server = http.createServer(app);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
