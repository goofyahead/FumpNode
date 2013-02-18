var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
});

var fumpers = [];

function check(currentTimeStamp, currentId) {
	fumpers.forEach( function (element){
		if ((element.timeStamp - currentTimeStamp) < 600 && element.id != currentId) {
			response.push(element);
		}
	});
}

app.post('/api/fump', function (req, res){
	var response = [];
	var currentTimeStamp = req.body.timestamp;
	var currentId = req.body.id;

	fumpers.push({timeStamp : currentTimeStamp, id : currentId});

	check(currentTimeStamp, currentId, response);

	console.log('looking for matches:');
	console.log(req.body.timestamp);
	
	if (response.length == 0) {
		setTimeout(function(){ 
			check(currentTimeStamp, currentId, response);
			console.log('delay check');
			res.send({'response_delayed': response});
		}, 1000);

	} else {
		res.send({'response_ok': response});
	}
});

app.listen(port);
console.log('listening on ' + port);