
var socket = io();

socket.on('send',function(short){
    document.getElementById('short').innerText = short;
});