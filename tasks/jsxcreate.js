var path = require('path');
var shell = require('shelljs');

module.exports = function (grunt) {

  'use strict';

  grunt.registerTask('jsxcreate', 'Wraps msginit to simplify locale creation.', function () {

    var options = this.options();
    var baseLocaleDir = options.localeDir || 'locale';
    var template = options.template;

    template = template || path.join(baseLocaleDir, 'templates/LC_MESSAGES/messages.pot');
    template = path.normalize(template);

    if (!grunt.file.isFile(template)) {
      grunt.log.error('template file "' + template + '" does not exist');
      return false;
    }

    options.locales.forEach(function(locale) {
      // Make the dir for the locale.
      var args = [];
      var outputFile = path.join(baseLocaleDir, locale, 'LC_MESSAGES/messages.po');

      args.push('msginit');

      // Non-interactive :)
      args.push('--no-translator');

      args.push('--input');
      args.push(template);

      args.push('--output');
      args.push(outputFile);

      grunt.file.mkdir(path.join(baseLocaleDir, locale, 'LC_MESSAGES'));

      args.push('-l');
      args.push(locale);

      // Synchronously execute commands.
      shell.exec(args.join(' '));

      grunt.log.ok('Locale "' + locale + '" created successfully.');
    });

  });

};
