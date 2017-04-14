/*
SPIKE 2 - SerialPort and FireBase Server
Author: Simon Caven
Last Modified: 13/04/2017
 */


var admin = require("firebase-admin");


// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://team20a2.firebaseio.com/"  // IMPORTANT: repalce the url with yours 
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/spike"); // channel name

// serialport set up
var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/ttyACM0",{
    parser: SerialPort.parsers.readline('\n')
});

var serverTime;
var jsDate;

// listen to events from the board and post to firebase
serialport.on('open', function(){
    console.log('Serial Port Opend');

        // data from board
        serialport.on('data', function(data){
            jsDate = new Date();
            serverTime = jsDate.getTime();
            
            console.log("ServerTime: " + serverTime);  
            ref.push({
              timestamp : serverTime
            });
            ref.remove(); // remove so client doesn't pick up data from last run
        }); 
});