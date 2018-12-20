/*
*	Description:	configuration file, where store the port of the the server and
*			paths of the key.pem and cert.pem and message on json
*/

var fsystem = require('fs');

var config = {};

config.desarrollo = {
	'portHttp' : 2000,
	'portHttps' : 2020,
	'nameEnv' : 'desarrollo',
	'filekey' : fsystem.readFileSync(__dirname+'/https/key.pem'),
	'filecert' : fsystem.readFileSync(__dirname+'/https/cert.pem'),
	'message' : {'message' : `Wellcome to server desarrollo`}
};

config.produccion = {
	'portHttp' : 3000,
	'portHttps' : 3001,
	'nameEnv' : 'produccion',
	'filekey' : fsystem.readFileSync(__dirname+'/https/key.pem'),
	'filecert' : fsystem.readFileSync(__dirname+'/https/cert.pem'),
	'message' : {'message' : `Wellcome to server produccion`}
};

var ambienteActual = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.ToLowerCase() : '';
var selectConfig = typeof(config[ambienteActual]) == 'object' ? config[ambienteActual] : config.desarrollo;

module.exports = selectConfig;

