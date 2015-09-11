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
    if (process.argv.join(' ').match(/\-\-help/i)) {
        console.log('USAGE:');
        console.log('> ooahh [options] [app]');
        console.log();
        console.log(' --help (Show This Help Menu)');
        console.log(' --init (CLI Source Generator)');
        console.log(' --generate (Generate Ooahh App By [app])');
        console.log();
        console.log(' [app] (App Source Directory)');
    } else {
        if (process.argv.join(' ').match(/\-\-init/i)) {
            init = true;
        }
        if (process.argv.join(' ').match(/\-\-generate/i)) {
            generate = true;
        }

        var buildapp = process.argv[process.argv.length-1];
        if (generate | init) {
            runBuild(buildapp,init,generate);
        } else {
            console.log('Invalid options supplied. Try --help');
        }
    }

};

function runBuild(app,init,generate) {
    if (generate) {
        console.log('Ooahh > Now Building App '+ app);
        var ooahhbuild = require('../ooahh/ooahhbuild.js');
        ooahhbuild(app,init,generate);
    } else {
        console.log('Ooahh > Now Generating App '+ app);
        var ooahhbuild = require('../ooahh/ooahhbuild.js');
        ooahhbuild(app,init,false);
    }
}
