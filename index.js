/*
*	author : Kevin David Quiroga Astroz
*	Description :  RESTful API , when someone posts in the route /hello, RESTful API response with a mesagge
*	Date : 20/12/2018
*/

// Dependecies
var http = require('http');
var https = require('https');
var config = require('./config');
var dataHttp = require('./lib/processHttpData');
var StringDecoder = require('string_decoder').StringDecoder;

// server http
var servidorHTTP = http.createServer(function(peticion, respuesta){
	logicServer(peticion, respuesta);
});

servidorHTTP.listen(config.portHttp, function(){
	console.log(`INFO : Start Server (ENV : ${config.nameEnv} ) - (HTTP-PORT : ${config.portHttp} )`);
});

// server https
var OptionsHttps = {
	'key' : config.filekey,
	'cert' : config.filecert
};

var servidorHTTPS = https.createServer(OptionsHttps,function(peticion, respuesta){
	logicServer(peticion, respuesta);
});

servidorHTTPS.listen(config.portHttps,function(){
	console.log(`INFO : Start Server (ENV : ${config.nameEnv} ) - (HTTPS-PORT : ${config.portHttps} )`);
});

// logic of the server
var logicServer = function(peticion, respuesta){
	var dataObj = dataHttp(peticion);
	var streamDecoder = new StringDecoder('utf-8');
	var buffer = '';

	peticion.on('data', function(data){
		buffer +=  streamDecoder.write(data);
	});

	peticion.on('end', function(data){
		buffer +=  streamDecoder.end();
		dataObj.payload = buffer;

		// select from the router the handler with the path
		var selecthandler = typeof(router[dataObj.path]) == 'undefined' ?
								router.notFound : router[dataObj.path];

		// call de handler and pass de callback and process de code and de respose json
		selecthandler(dataObj, function(code, infoReturned){
			code = typeof(code) == 'number' ? code : 400;
			infoReturned = typeof(infoReturned) == 'object' ? infoReturned : {};

			respuesta.setHeader('Content-Type', 'application/json');
			respuesta.writeHead(code);
			respuesta.end(JSON.stringify(infoReturned));

			console.log(JSON.stringify(dataObj) + "\n");
		});
 	});	
};

// handlers
handlers = {};

// handler /hello
handlers.hello = function(data,callback){
	switch(data.method)
	{
		// switch case for diferentes actions when the method change
		case 'post':
			callback(200, config.message);
		break;

		default:
			callback();
		break;
	}	
};

// handler 404
handlers.notFound = function(data, callback){
	callback(400);
};

// router
var router = {
	'hello': handlers.hello,
	'notFound' : handlers.notFound
};
