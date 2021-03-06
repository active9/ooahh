var fs = require('fs'),
  path = require('path'),
  os = require('os');

module.exports = function(app,build,init,generate) {
  app = path.resolve(app);
  build = path.resolve(build);
  console.log('Changing Into Directory:',app);
  process.cwd(app);
  console.log('Building In Directory:',build);

  // Init
  if (init) {
    generate = false;
    console.log('Ooahh Generator Starting...');
    var generator = require('../lib/generator.js');
    generator(app);

  // Generate
  } else if (generate) {
    console.log('Ooahh Build Starting On ', app);
    if (!fs.existsSync(path.resolve(app +'/package.json'))) {
      console.log ('Error: Invalid Directory Specified.');
      process.exit(1);
    }

    var NwBuilder = require('nw-builder');
    var options = {
      version: '0.12.3',
      buildDir: build,
      cacheDir: os.tmpdir(),
      files: app +'/**', // use the glob format
      platforms: ['linux32', 'linux64', 'osx32', 'osx64', 'win32', 'win64']
    };
    var nw = new NwBuilder(options);

    var streamCopyFile = require('stream-copy-file');
    function callback (err) {
      if (err) {
        throw err;
      }

      console.log('files already exist.');
    }

    var copyFileSync = function(srcFile, destFile, encoding) {
      var content = fs.readFileSync(srcFile, encoding);
      fs.writeFileSync(destFile, content, encoding);
    }

    // Log output
    nw.on('log',  console.log);

    // Build returns a promise
    nw.build().then(function () {
      console.log('Build Success.');
    }).catch(function (error) {
      console.error(error);
    });
  } else {
    console.log('Invalid Options Passed. Exiting..');
  }
}
