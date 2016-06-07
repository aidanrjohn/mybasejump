'use strict';

var express = require('express');
var dateFormat = require("dateformat");

var app = express();

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/:date', function (req, res) {
	
    var date = req.params.date;
    var thisDate = new Date(date);
    var json;
     
    if(thisDate.toString() == "Invalid Date") {
    	console.log("Trying unix...");
    	thisDate = new Date(parseInt(date));
    }
    	
    if(thisDate.toString() == "Invalid Date") {
    	
    	json = { "unix": null, "natural": null };
    }
    
    else {
    	
    var dateString = dateFormat(thisDate, "mmmm d, yyyy");
    var unix = thisDate.getTime();
    json = { "unix": unix, "natural": dateString };
    
    }
    
     res.send(json);

});

app.listen(8080, function () {
    console.log('Listening on port 8080...');
});
