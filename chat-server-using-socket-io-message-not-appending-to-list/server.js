var express = require('express');
var soc = require('socket.io')
var http = require('http');
var ip = require('ip');

var app = express();
var server = http.createServer(app).listen(3000);
var io = soc(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/chat.html");
});

io.on('connection', function(socket) {
  var x = 0, y = 5;
  function updateAllClients() {
    io.sockets.emit('update', {x:x++, y:y++});
    t = setTimeout(updateAllClients, 100);
  }
  updateAllClients();
  var address = socket.handshake.address;
  var pos = address.indexOf('1');
  var len = address.length;
  address = address.slice(-1 * (len - pos));
  /*if(address[0] === ':') {
      address = ip.address();
  }*/
  console.log(address + ' connected');
  socket.on('disconnect', function() {
    console.log(arguments);
    console.log(address + ' disconnected');
  });
  socket.on('message', function(message) {
    io.emit('update', message);
  });
});
