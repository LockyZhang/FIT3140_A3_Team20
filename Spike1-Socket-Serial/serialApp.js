

/*
SPIKE 1 - SerialPort and Socket.IO Server
Author: Simon Caven
Last Modified: 13/04/2017
 */

// server and socket.io set up 
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// serialport set up
var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/ttyACM0",{
    parser: SerialPort.parsers.readline('\n')
});

var serverTime;
var jsDate;

// serve page for get requests
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/serialClient.html');
});

// set port
http.listen(5000, function () {
  console.log('listening on *:3001'); 
});


// listen to events from the board and emit to client
serialport.on('open', function(){
    console.log('Serial Port Opend');

    // set up socket and socket listening events
    io.on('connection', function (socket) {
        console.log('Get a connection');

        // data from board
        serialport.on('data', function(data){
            jsDate = new Date();
            serverTime = jsDate.getTime();
            
            console.log("ServerTime: " + serverTime);  
            socket.emit('server', serverTime);
        });
    
    });
  
});







  
