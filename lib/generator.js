var clc = require('cli-color');
var prompt = require('prompt');
var fs = require('fs');
var unzip = require('unzip');
var fstream = require('fstream');
var path = require('path');

module.exports = function(app) {

var schema = {
  properties: {
    app:  require("../generators/app.js"),
    dependencies:  require("../generators/dependencies.js")
  }
};

var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;
var info = clc.cyan;

console.log(info("Welcome to the Ooahh App Generator"));

prompt.message = "Ooahh Generator ".white;

prompt.start();

prompt.get(schema, function (err, result) {


  console.log("");
  process.stdout.write("Ooahh App Generating.");

  if (fs.existsSync(app)) {
	process.stdout.write(".");
	var appDir = path.resolve(app +'/'+ result['app'].name);
	if (!fs.existsSync(appDir)) {
		process.stdout.write(".");
		fs.mkdirSync(appDir);
		process.stdout.write(".");
		if (fs.existsSync(appDir)) {
			process.stdout.write(".");

			// Write the generator.blah
			fs.writeFileSync(appDir +"/package.blah", result['dependencies'].dependencies);
			process.stdout.write(".");

			// Required due to a strange fs bug
			if (fs.existsSync(appDir)) {
				process.stdout.write(".");
				var distribution = require('../generators/dist.js');

				var readStream = fs.createReadStream(path.resolve('../generators/'+ distribution.app));
				var writeStream = fstream.Writer(appDir);

				readStream
					.pipe(unzip.Parse())
					.pipe(writeStream);

				process.stdout.write(". Done");
				console.log("");
				console.log("Ooahh App Generated At:", appDir);
			} else {
				process.stdout.write("[x]");
				console.log("");
				console.log("FAILED: Your File System Did Not Respond Quick Enough To Generate A Ooahh App.");
			}

		} else {
			process.stdout.write("[x]");
			console.log("");
			console.log("FAILED: Directory Creation Failure. Can not generate "+ result['app'].name +" folder in "+ appDir +"");
		}
	} else {
		process.stdout.write("[x]");
		console.log("");
		console.log("FAILED: App directory ("+ appDir +") already exists.");
	}
  } else {
	process.stdout.write("[x]");
	console.log("");
	console.log("FAILED: Invalid App Directory. Does the folder ("+ appDir +") exist?");
  }


});

}