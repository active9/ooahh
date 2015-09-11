var clc = require('cli-color'),
    prompt = require('prompt'),
    fs = require('fs'),
    unzip = require('unzip'),
    fstream = require('fstream'),
    path = require('path'),
    downloadHTTP = require('download-http');

module.exports = function(app) {

	var schema = {
    	properties: {
        	app:  require('../generators/app.js'),
        	dependencies:  require('../generators/dependencies.js')
    	}
	};

	var error = clc.red.bold,
	    warn = clc.yellow,
	    notice = clc.blue,
	    info = clc.cyan;

	console.log(info('Welcome to the Ooahh App Generator'));
	prompt.message = 'Ooahh Generator '.white;
	prompt.start();
	prompt.get(schema, function (err, result) {
  		console.log('');
  		process.stdout.write('Ooahh App Generating.');

	  	if (fs.existsSync(app)) {
			process.stdout.write('.');
			var appDir = path.resolve(app +'/'+ result['app'].name);
			if (!fs.existsSync(appDir)) {
				process.stdout.write('.');
				console.log('');
				console.log('Changing Directories To: ', app);
				process.chdir(path.resolve(app));
				process.stdout.write('.');
				fs.mkdirSync(appDir);
				process.stdout.write('.');
				if (fs.existsSync(appDir)) {
					process.stdout.write('.');

					// Write the generator.blah
					fs.writeFileSync(path.resolve(appDir +'/package.blah'), result['dependencies'].dependencies);
					process.stdout.write('.');

					// Required due to a strange fs bug
					if (fs.existsSync(appDir)) {
						process.stdout.write('.');
						console.log('');

						var url = 'http://ooahh.com/dist/app.zip';
						console.log('Downloading Distribution Package ');
						downloadHTTP(url, path.resolve(appDir +'/app.zip'), function (error) {
							if (error) {
						        throw error;
							}
							console.log('Success');

							var readStream = fs.createReadStream(path.resolve(appDir +'/app.zip'));
							var writeStream = fstream.Writer(path.resolve(appDir));
							readStream
								.pipe(unzip.Parse())
								.pipe(writeStream);

							process.stdout.write('. Done');
							console.log('');
							console.log('Ooahh App Generated At:', appDir);
							fs.unlink(path.resolve(appDir +'/app.zip'));
						});
					} else {
						process.stdout.write('[x]');
						console.log('');
						console.log('FAILED: Your File System Did Not Respond Quick Enough To Generate An Ooahh App.');
					}

				} else {
					process.stdout.write('[x]');
					console.log('');
					console.log('FAILED: Directory Creation Failure. Can not generate '+ result['app'].name +' folder in '+ appDir +'');
				}
			} else {
				process.stdout.write('[x]');
				console.log('');
				console.log('FAILED: App directory ('+ appDir +') already exists.');
			}
  		} else {
			process.stdout.write('[x]');
			console.log('');
			console.log('FAILED: Invalid App Directory. Does the folder ('+ appDir +') exist?');
  		}
	});

}
