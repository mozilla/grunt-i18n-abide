var fs = require('fs');
var path = require('path');


function compileJSON() {

}

function compileMo() {

}


module.exports = function (grunt) {

  'use strict';

  grunt.registerMultiTask('jsxcompile', 'Wraps msgmerge to simplify updating new locales.', function () {

    var args = [];
    var done = this.async();
    var options = this.options();

    var spawnOpts = {
      stdio: 'inherit'
    };

    if (options.cwd) {
      spawnOpts.cwd = options.cwd;
    }

    grunt.util.spawn({
      cmd: 'msgmerge',
      args: args,
      opts: spawnOpts
    },
    function (error) {
      if (error) {
        grunt.fail.fatal('msgmerge must be installed. Check how to install gettext for your platform');
      }
      done();
    });

  });

};
