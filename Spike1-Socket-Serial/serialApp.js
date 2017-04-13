


// server and socket.io set up and serialport
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/ttyACM0",{
    parser: SerialPort.parsers.readline('\n')
});


app.get('/', function (req, res) {

  //send the index.html file for all requests
  res.sendFile(__dirname + '/serialClient.html');

});

http.listen(3001, function () {

  console.log('listening on *:3001');

});


// listen to events from the board and emit to client
serialport.on('open', function(){
    console.log('Serial Port Opend');

    // set up socket and socket listening events
    io.on('connection', function (socket) {
        console.log('Get a connection');

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



  
