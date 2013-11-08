var path = require('path');
var shell = require('shelljs');

require('shelljs/global');

module.exports = function (grunt) {

  'use strict';

  grunt.registerTask('jsxmerge', 'Wraps msgmerge to simplify merging of translation strings.', function () {

    var options = this.options();
    var baseLocaleDir = options.localeDir || 'locale';

    var template = options.template;
    template = template || path.join(baseLocaleDir, 'templates/LC_MESSAGES/messages.pot');
    template = path.normalize(template);

    if (!grunt.file.isFile(template)) {
      grunt.log.error('template file "' + template + '" does not exist');
      return false;
    }

    var files = shell.find(baseLocaleDir).filter(function(file) {
      return file.match(/\.po$/);
    });

    files.forEach(function(lang){
      var args = [];
      var moveArgs = [];
      var dir = path.dirname(lang);
      var stem = path.basename(lang, '.po');

      args.push('msgmerge');
      args.push('-q');
      args.push('-o');
      args.push(path.join(dir, stem + '.po.tmp'));
      args.push(path.join(dir, stem + '.po'));
      args.push(template);

      shell.exec(args.join(' '));

      moveArgs.push('mv');
      moveArgs.push(path.join(dir, stem + '.po.tmp'));
      moveArgs.push(path.join(dir, stem + '.po'));

      shell.exec(moveArgs.join(' '));

    });

    grunt.log.ok('Locales merged successfully.');

  });

};
