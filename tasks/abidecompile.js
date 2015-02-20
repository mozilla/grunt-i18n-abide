var fs = require('fs');
var path = require('path');
var os = require('os');

var po2json = require('po2json');
var shell = require('shelljs');
var i18n = require('i18n-abide');

var helpers = require('./lib/helpers');

var runShellSync = helpers.runShellSync;

var reservedWords = [
  'do', 'if', 'in', 'for', 'let', 'new', 'try', 'var', 'case', 'else', 'enum', 'eval',
  'false', 'null', 'this', 'true', 'void', 'with', 'break', 'catch', 'class', 'const',
  'super', 'throw', 'while', 'yield', 'delete', 'export', 'import', 'public', 'return',
  'static', 'switch', 'typeof', 'default', 'extends', 'finally', 'package', 'private',
  'continue', 'debugger', 'function', 'arguments', 'interface', 'protected',
  'implements', 'instanceof'
];

var basicVarRx = /^[_$a-zA-Z]{1}[a-zA-Z0-9._$]+?$/;

module.exports = function (grunt) {

  'use strict';

  function basicVarNameCheck(varName) {
    return reservedWords.indexOf(varName) === -1 && basicVarRx.test(varName);
  }

  function compileJSON(files, localeDir, dest, jsVar, options) {

    // Default creation of JS files to true.
    var createJSFiles = options.createJSFiles;
    if (typeof createJSFiles === 'undefined') {
      createJSFiles = true;
    }

    if (helpers.lockFileExists(options.lockFileName)) {
      var lockFilePath = helpers.getLockFilePath(options.lockFileName);
      grunt.fail.fatal('Lock file exists at: ' + lockFilePath + ' Aborting!');
      return;
    }

    helpers.createLockFile(options.lockFileName);

    try {
      files.forEach(function(pofile){
        var args = [];
        var dir = path.dirname(pofile);
        var subdir = path.dirname(dir);
        var locale = path.basename(subdir);
        var stem = path.basename(pofile, '.po');

        var jsonfile = path.join(dest, locale, stem +'.json');
        var jsfile = path.join(dest, locale, stem + '.js');
        grunt.file.mkdir(path.join(dest, locale));

        var json = po2json.parseFileSync(pofile, { stringify: true, pretty: true });
        var result = '{\n  "messages": ' + json + '}';
        fs.writeFileSync(jsonfile, result, {});

        if (createJSFiles) {
          fs.writeFileSync(jsfile, 'window.' + jsVar + ' = {\n');
          fs.writeFileSync(jsfile, '"messages": ' + json + ',\n', { flag: 'a' });
          fs.writeFileSync(jsfile, '"locale": "' + locale + '",\n', { flag: 'a' });
          fs.writeFileSync(jsfile, '"lang": "' + i18n.languageFrom(locale) + '"\n}', { flag: 'a' });
        }
      });
    } finally {
      helpers.removeLockFile(options.lockFileName);
    }
  }

  function compileMo(files, options) {
    var cmd = helpers.getCommand(options.cmd || 'msgfmt');

    files.forEach(function(locale) {
      var dir = path.dirname(locale);
      var stem = path.basename(locale, '.po');
      var args = ['-o'];
      args.push(path.join(dir, stem + '.mo'));
      args.push(locale);
      runShellSync(cmd, args);
    });
  }

  grunt.registerMultiTask('abideCompile', 'Wraps po2json/ to simplify updating new locales.', function () {

    var options = this.options();
    var dest = this.data.dest;
    var type = options.type || 'json';
    type = type.toLowerCase();
    var validTypes = ['json', 'mo', 'both'];
    var localeDir = options.localeDir || 'locale';
    var jsVar = options.jsVar || 'json_locale_data';

    if (!basicVarNameCheck(jsVar)) {
      grunt.fail.fatal('"' + jsVar + '" is an invalid var name or reserved word.');
    }

    if (!dest && type === 'json') {
      grunt.fail.fatal('"dest" needs to be specifed when type is JSON');
    }

    if (!localeDir || !grunt.file.isDir(localeDir)) {
      grunt.fail.fatal('localeDir: "' + localeDir + '" doesn\'t exist!');
    }

    if (validTypes.indexOf(type) === -1) {
      grunt.fail.fatal('"options.type" is invalid should be one of ' + validTypes.join(', '));
    }

    var files = shell.find(localeDir).filter(function(file) {
      return file.match(/\.po$/);
    });

    switch(type) {
      case 'json':
        compileJSON(files, localeDir, dest, jsVar, options);
        break;
      case 'mo':
        compileMo(files, options);
        break;
    }

  });

};
