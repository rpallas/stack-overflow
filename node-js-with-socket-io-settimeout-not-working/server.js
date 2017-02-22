var express = require('express');
var soc = require('socket.io')
var http = require('http');

var app = express();
var server = http.createServer(app).listen(3000);
var io = soc(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket) {
  console.log('connected');
});

var x = 0, y = 9999;
function updateAllClients() {
  var data = { x: x++, y: y-- };
  console.log(data);
  io.emit('update', data);
  setTimeout(updateAllClients, 1000);
}
updateAllClients();
