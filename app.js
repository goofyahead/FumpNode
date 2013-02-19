var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
});

var fumpers = new Object();

function check(currentTimeStamp, currentId, response) {
	console.log('number of fumps in comparison ' + Object.keys(fumpers).length);
	for (var key in fumpers) {
		console.log("compairing: " + Math.abs(currentTimeStamp - fumpers[key].timeStamp));
		if (Math.abs(currentTimeStamp - fumpers[key].timeStamp) < 800 && currentId != fumpers[key].id) {
			var elementResponse = {timeStamp : fumpers[key].timeStamp, id : fumpers[key].id };
			response.push(elementResponse);
			console.log("added to reponse one match " + JSON.stringify(fumpers[key]));
		}
	}
}

app.post('/api/fump', function (req, res){
	var response = [];
	var currentTimeStamp = req.body.timestamp;
	var currentId = req.body.id;

	var currentElement = { timeStamp : currentTimeStamp, id : currentId };

	var currentKey = currentTimeStamp+currentId;
	fumpers[currentKey] = currentElement;

	check(currentTimeStamp, currentId, response);

	console.log('looking for matches:');
	console.log(req.body.timestamp);
	
	if (response.length == 0) {
		setTimeout(function(){ 
			check(currentTimeStamp, currentId, response);
			console.log('delay check');
			console.log('number of fumps ' + fumpers.length);
			res.send({'response_delayed': response});
			setTimeout(function(){ 
				delete fumpers[currentKey];
			},2000);
		}, 1000);
	} else {
		res.send({'response_ok': response});
		setTimeout(function(){
			delete fumpers[currentKey];
		},2000);
	}
});

app.listen(port);
console.log('listening on ' + port);