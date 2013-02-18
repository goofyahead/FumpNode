var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
});

var fumpers = [];

function check(currentTimeStamp, currentId, response) {
	console.log('number of fumps in comparison' + fumpers.length);
	fumpers.forEach( function (element){
		console.log("compairing: " + Math.abs(currentTimeStamp - element.timeStamp));
		if (Math.abs(currentTimeStamp - element.timeStamp) < 1000 && element.id != currentId) {
			response.push(element);
			console.log("added to reponse one match");
		}
	});
}

app.post('/api/fump', function (req, res){
	var response = [];
	var currentTimeStamp = req.body.timestamp;
	var currentId = req.body.id;

	var currentElement = {timeStamp : currentTimeStamp, id : currentId};

	fumpers.push(currentElement);

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
				var index = array.indexOf(currentElement);
				array.splice(index, 1);
			},2000);
		}, 1000);

	} else {
		res.send({'response_ok': response});
		setTimeout(function(){ 
			var index = array.indexOf(currentElement);
			array.splice(index, 1);
		},2000);
	}
});

app.listen(port);
console.log('listening on ' + port);