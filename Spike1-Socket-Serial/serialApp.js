


// server and socket.io set up and serialport
var http = require('http');
var express = require('express');
var app = express();
var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/ttyACM0");
var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);

app.get('/', function (req, res) {

  //send the index.html file for all requests
  res.sendFile(__dirname + '/index.html');

});


// listen to events from the board and emit to client
serialport.on('open', function(){
    console.log('Serial Port Opend');

    // set up socket and socket listening events
    io.on('connection', (socket) => {
        console.log('socket connected');
        
        serialport.on('data', function(data){
            var d = new Date();
            timestamp = d.getTime();
            
            console.log(data);
            console.log("Timestamp: " + timestamp);  
            socket.emit('send', timestamp);
        });  
    });
});




var timestamp = 0;



  
