// renderer.js

var SerialPort = require("serialport");
var Readline = SerialPort.parsers.Readline;
var p5 = require("p5");

var sketch = function(p) {
    var width = 840;
    var height = 320;
    var port, parser;
    var xPos = 0;
    var yPos = 0;
    var prevXPos = 0;
    var prevYPos = 0;

    p.setup = function() {
        p.createCanvas(width, height);
        p.background(255, 255, 0);
        p.strokeWeight(1);
        // p.stroke(255, 255, 255);

        port = new SerialPort("/dev/cu.usbmodem1411");
        parser = port.pipe(new Readline({ delimiter: '\r\n'} ));

        port.on("open", function() {
            console.log("Connect to serial port");
        });

        parser.on("data", function(data) {
            console.log(data);

            // The `map` function transforms your data linearly under a new scale. 
            // What does it mean? Let me give you an example. 
            // If your data is 5 on a 0-10 scale, it will be 50 on a 0-100 scale. 
            // We want to change our temperature that might range between 20 to 30 C, 
            // to the height of the sketch/canvas. 
            yPos = p.map(data, 0, 4095, 0, height); // Add this line
            xPos += 1; //Everytime we get the data we will move the x position once. 
            
            // Note the `height-yPos` thing. 
            // Since p5 considers 0, 0 at the top left coner rather than the bottom left coner, 
            // the higher the temperature, the higher the dot should be, thus the lower the y position. 
            // p.ellipse(xPos, height-yPos, 5, 5); // We draw our data as circles. 5 indicates its size in x and y-axis. 
            p.line(prevXPos, height-prevYPos, xPos, height-yPos);

            if (xPos > width) {
                // But if we move outside the canvas, we want to circle back 
                xPos = 0;
                p.clear(); // We also want to clean up our canvas
            }

            prevXPos = xPos;
            prevYPos = yPos;

        });
    };

    p.draw = function() {

    };
};

var app = new p5(sketch, document.getElementById("graph"))

