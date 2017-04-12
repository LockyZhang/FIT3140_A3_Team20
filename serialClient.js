var socket=io();

socket.on('send',function(timeS){
    console.log(timeS);
});