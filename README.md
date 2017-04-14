# Assignment 3 IoT Control Panel - TEAM 20


This Web App controls the Arduino Uno board by proving switches and buttons that communicate with a Firebase database and client.
The aim of the program is to listen to the UI events client's request from the Web App and transfer to the server. The server starts reading data from the motion sensor and client and forwards them to the firebase database. The client will also post its data to firebase.
If an intruder event is detected as described by a sequence of "Long,Short,Long,Long" events, the intruder counter is incremented.

## SPIKE 1

To run the server,
- node serialApp.js

## SPIKE 2

To run the server,
- node firebaseServer.js

To serve the client,
- firebase serve

All client pages are served from port 5000. 


### Set Up

[![N|Solid](http://www.learningaboutelectronics.com/images/Arduino-motion-sensor-circuit.png)](https://nodesource.com/products/nsolid)
diagram from: http://www.learningaboutelectronics.com/Articles/Arduino-motion-sensor-light-circuit.php
- red wire: connect "vcc" pin on sensor with "5V" on microcontroller  (The motion sensor should be powered with 5V)
- blue wire: connect "OUT" on sensor with "2" on microcontroller  (Transfer data between the microcontroller and the sensor)
- black wire: connect "GND" on sensor with "GND" on micirocontroller
- LED: the shorter leg connects to "GND" and the longer leg connects to "13" 

Please Note: If using the HC-SR501 motion sensor, reverse the inputs for "GND" and "OUT".

### Configuration and Settings

- It is recommended you allow your motion sensor a minute to fully calibrate before use.
- The App is configured for a motion time delay of 3 seconds. This is the time the motion sensor waits for without a motion event before            determining that the motion has ended. This is set on the motion sensor itself by turning fully ant-clockwise the time delay control knob         (consult your motion sensor documentation for details). If your motion sensor has a different minimum time delay than 3 seconds, change *time     _delay* in www file. 
- The App is configured for a motion time out of 3 seconds. This is the time it takes for the motion sensor to reset itself after an event has      been detected. During this time, no motion can be detected. This is the required setting for the HC-SR501 motion sensor. If operating a           different sensor, you can set the time out with *time_out* in www file.
- The App is set to run in repeated trigger mode. This means the time delay is reset with every detected motion. Repeated trigger mode is manually set on the motion sensor through the use of a jumper (consult your motion sensor documentation for details)








