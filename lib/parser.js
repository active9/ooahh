var path = require('path');
var fs = require('fs');

module.exports = function(cb) {
	var app = require(process.cwd() +'/.ooahh');
	if (app) {
		return cb(app);
	} else {
		return cb(false);
	}
}