var fs = require('fs'),
    path = require('path');

module.exports = function(app,init,generate) {
app = path.resolve(''+app+'');
console.log("DIRCHANGE",app);
process.chdir(app);
console.log(__dirname,path.resolve(app));

    if (init) {
	generate = false;
	console.log("Ooahh Generator Starting On "+ app +"");
	var generator = require('../lib/generator.js');
	generator(app);
    } else if (generate) {
	console.log("Ooahh Build Starting On "+ app +"");

	var NwBuilder = require('node-webkit-builder');
	var options = {
            version: '0.12.1',
	    buildDir: '../build',
	    cacheDir: '../cache',
	    files: app +'/**', // use the glob format
	    platforms: ['linux32', 'linux64', 'osx32', 'osx64', 'win32', 'win64']
	};
	var nw = new NwBuilder(options);

	var streamCopyFile = require('stream-copy-file');
	function callback (err) {
	    if (err) {
	        throw err;
	    }
	    console.log('files exist, what now?');
	}

	var copyFileSync = function(srcFile, destFile, encoding) {
	  var content = fs.readFileSync(srcFile, encoding);
	  fs.writeFileSync(destFile, content, encoding);
	}

	//Log stuff you want

	nw.on('log',  console.log);

	// Build returns a promise
	nw.build().then(function () {
	   console.log('Build Success.');

	}).catch(function (error) {
	    console.error(error);
	});
    } else {
	console.log("Invalid Options. Exiting..");
    }
}