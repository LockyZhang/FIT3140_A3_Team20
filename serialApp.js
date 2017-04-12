//set up serial port
var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/ttyACM0",{
    parser: SerialPort.parsers.readline('\n')
});

// server and socket.io set up
var express = require('express');
var app = express();
var http = require('http');
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(port);

var timestamp = 0;


// listen to eveents from the board and emit to client
serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
      var d = new Date();
      timestamp = d.getTime();
      console.log(data);
      console.log("Timestamp: " + timestamp);
      io.emit('send', timestamp);
  });
});

// set up socket and socket listening events
  io.on('connection', (socket) => {
      console.log('socket connected');
   });


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}