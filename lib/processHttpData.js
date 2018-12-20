/*
*	Description : 	Recv data from request and parse and return object with
*					the result.
*/

//dependencies
var url = require('url');

// principal function
var processHttpData = function(peticion){

	var parseUrl = url.parse(peticion.url, true);
	var path_clear = parseUrl.pathname.replace(/^\/+|\/+$/g,'');
	var method = peticion.method.toLowerCase();
	var headers = peticion.headers;
	var queryStr = parseUrl.query;
	var payload = '';

	var objReturn = {
		'path' : path_clear,
		'method' : method,
		'headers' : headers,
		'queryString' : queryStr,
		'payload' : payload
	}

	return objReturn;
};

module.exports = processHttpData;
