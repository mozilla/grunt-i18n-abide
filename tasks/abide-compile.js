var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var lockFilePath = '/tmp/abide-compile.lock';


module.exports = function (grunt) {

  'use strict';

  function createLockFile() {
    return fs.openSync(lockFilePath, 'w');
  }

  function removeLockFile() {
    return fs.unlink(lockFilePath);
  }

  function lockFileExists() {
    return grunt.file.isFile(lockFilePath);
  }

  function compileJSON(files, localeDir, dest) {

    createLockFile();

    files.forEach(function(pofile){
      var args = [];
      var dir = path.dirname(pofile);
      var subdir = path.dirname(dir);
      var lang = path.basename(subdir);
      var stem = path.basename(pofile, '.po');

      var jsonfile = path.join(dest, lang, stem +'.json');
      var jsfile = path.join(dest, lang, stem + '.js');
      grunt.file.mkdir(path.join(dest, lang));

      args.push(path.join(__dirname, '../node_modules/po2json/bin/po2json'));
      args.push(pofile);
      args.push(jsonfile);

      // Create json file.
      shell.exec(args.join(' '));

      fs.writeFileSync(jsfile, 'var json_locale_data = ');
      fs.writeFileSync(jsfile, fs.readFileSync(jsonfile), { flag: 'a' });
      fs.writeFileSync(jsfile, ';', { flag: 'a' });
    });

    removeLockFile();

  }

  function compileMo(files) {

    files.forEach(function(lang) {
      var dir = path.dirname(lang);
      var stem = path.basename(lang, '.po');
      var args = ['msgfmt', '-o'];
      args.push(path.join(dir, stem + '.mo'));
      args.push(lang);
      shell.exec(args.join(' '));
    });

  }

  grunt.registerMultiTask('abide-compile', 'Wraps po2json/ to simplify updating new locales.', function () {

    var options = this.options();
    var dest = this.data.dest;
    var type = options.type.toLowerCase();
    var validTypes = ['json', 'mo', 'both'];
    var localeDir = options.localeDir || 'locale';

    if (validTypes.indexOf(type) === -1) {
      grunt.log.error('"options.type" is invalid should be one of ' + validTypes.join(', '));
      return false;
    }

    var files = shell.find(localeDir).filter(function(file) {
      return file.match(/\.po$/);
    });

    switch(type) {
      case 'json':
        compileJSON(files, localeDir, dest);
        break;
      case 'mo':
        compileMo(files);
        break;
    }

  });

};
