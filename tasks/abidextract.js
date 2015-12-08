var fs = require('fs');
var path = require('path');
var helpers = require('./lib/helpers');

var runShellSync = helpers.runShellSync;

var cmdPaths = [ '../../.bin/jsxgettext', '../node_modules/.bin/jsxgettext' ];

module.exports = function (grunt) {

  'use strict';
  
  var cachedPath = null;
  var getPath = function(){
    var idx, lpaths, _path;
    if( cachedPath ){
      return cachedPath;
    }
    lpaths = cmdPaths.length;
    for( idx = 0; idx < lpaths; idx++ ){
      _path = path.join(__dirname, cmdPaths[idx]);
      try{
        fs.statSync( _path );
        cachedPath = _path;
        return _path;
        }catch(err){
          grunt.log.ok(err);
      }
    }
    grunt.fail.fatal('Cannot find jsxgettext.');
  };

  grunt.registerMultiTask('abideExtract', 'Extracts gettext from js, EJS or Jinja (nunjucks).', function () {

    // Defaults.
    var options = this.options({
      language: 'JavaScript',
      join: true,
    });
    
    var cmd = helpers.getCommand(options.cmd || getPath() );

    var args = [];
    var filesSrc = this.filesSrc;
    var dest = path.normalize(this.data.dest);
    var destDir = path.dirname(dest);

    if (filesSrc instanceof Array && filesSrc.length) {
      filesSrc.forEach(function (item) {
        if (!grunt.file.isFile(item)) {
          grunt.log.warn('Src file "' + item + '" not found.');
        } else {
          args.push(item);
        }
      });
    } else {
      grunt.fail.fatal('Src list is empty. Bailing...');
    }

    // Make the destination dir if it doesn't exist.
    grunt.file.mkdir(destDir);

    if (!grunt.file.isDir(destDir)) {
      grunt.fail.fatal('Destination directory "' + destDir + '" not found.');
    } else {
      args.push('-o');
      args.push(dest);
    }

    if (options.join) {
      args.push('--join-existing');
    }

    if (options.language) {
      args.push('--language');
      args.push(options.language);
    }

    if (options.keyword) {
      args.push('--keyword');
      args.push(options.keyword);
    }

    if (options.args) {
      options.args.forEach(function (arg) {
        args.push(arg);
      });
    }

    var result = runShellSync(cmd, args);

  });
};
