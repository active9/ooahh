'use strict';

var path = require('path');

module.exports = function (program) {
    var app = '',
      init = false,
      generate = false;

    if (typeof program !== 'undefined') {
      if (typeof program.app !== 'undefined') {
        app = program.app;
      } else if (typeof program.force !== 'undefined') {
        force = program.force;
      } else if (typeof program.generate !== 'undefined') {
        force = program.generate;
      }
    }

    // No Valid CLI Options Passed
    if (process.argv.join(' ').match(/\-\-help/i)) {
      console.log('USAGE:');
      console.log('> ooahh [options] [app]');
      console.log();
      console.log(' --help (Show This Help Menu)');
      console.log(' --init (CLI Source Generator)');
      console.log(' --generate (Generate Ooahh App By [app])');
      console.log();
      console.log(' [app] (App Source Directory)');

    // Valid Options Found
    } else {
      // Init Option
      if (process.argv.join(' ').match(/\-\-init/i)) {
        init = true;
      }

      // Generate Option
      if (process.argv.join(' ').match(/\-\-generate/i)) {
        generate = true;
      }

      var buildapp = process.argv[process.argv.length-1];
      if (buildapp.match(/\-\-generate/i) || buildapp.match(/\-\-init/i)) {
        buildapp = process.cwd();
      }
      if (generate | init) {
        runBuild(buildapp,path.resolve(path.resolve(path.resolve(path.resolve(buildapp),'../'))+'/build'),init,generate);
      } else {
        var parser = require('./parser.js');
        if (parser(function(data) {
          process.cwd(path.resolve(process.cwd()+'/'+ data.source));
          generate = true;
          runBuild(path.resolve(process.cwd()+'/'+ data.source),path.resolve(process.cwd()+'/'+ data.build),init,generate);
          return true;
        })) {
        } else {
          console.log('Invalid options supplied. Try --help');
        }
      }
    }
};

function runBuild(app,build,init,generate) {
  if (generate) {
    console.log('Ooahh is Now Building Your App: '+ app);
    var ooahhbuild = require('../ooahh/ooahhbuild.js');
    ooahhbuild(app,build,init,generate);
  } else {
    console.log('Ooahh is Now Generating Your App: '+ app);
    var ooahhbuild = require('../ooahh/ooahhbuild.js');
    ooahhbuild(app,build,init,false);
  }
}
