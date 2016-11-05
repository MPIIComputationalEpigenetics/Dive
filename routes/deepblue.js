'use strict';

var express = require('express');
var router = express.Router();
var http = require('http');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/*", function(req, request_res, next) {
	var path = "/api"+req.url;
	//var path = req.url;

	console.log(path)

	http.get({
  		//hostname: "localhost",
  		hostname: "deepblue.mpi-inf.mpg.de",
  		//port: 5000,
  		path: path,
  		method: 'GET'
	}, function (res) {
		res.setEncoding('utf8');
		var data = [];
		res.on('data', function (chunk) {
			console.log(chunk);
			data.push(chunk);
	  	});
		res.on('end', function() {
	    	request_res.send(data.join(""));
	  	});
	});
});

module.exports = router;
