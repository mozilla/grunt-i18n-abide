var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {

  'use strict';

  grunt.registerMultiTask('abide-extract', 'Extracts gettext from js, EJS or Jinja (nunjucks).', function () {

    // Defaults.
    var options = this.options({
      language: 'JavaScript',
      sort: true,
      join: true,
    });

    var done = this.async();
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
      grunt.log.error('Src list is empty. Bailing...');
      return false;
    }

    // Make the destination dir if it doesn't exist.
    grunt.file.mkdir(destDir);

    if (!grunt.file.isDir(destDir)) {
      grunt.log.error('Destination directory "' + destDir + '" not found.');
      return false;
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

    if (options.sort) {
      args.push('--sort');
    }

    if (options.args) {
      options.args.forEach(function (arg) {
        args.push(arg);
      });
    }

    var spawnOpts = {
      stdio: 'inherit'
    };

    if (options.cwd) {
      spawnOpts.cwd = options.cwd;
    }

    if (options.env) {
      spawnOpts.env = process.env;
      var envProps = Object.keys(options.env);
      envProps.forEach(function (envProp) {
        spawnOpts.env[envProp] = options.env[envProp];
      });
    }

    grunt.util.spawn({
      cmd: path.join(__dirname, '../node_modules/.bin/jsxgettext'),
      args: args,
      opts: spawnOpts
    },
    function (error) {
      if (error) {
        grunt.fail.fatal('jsxgettext must be installed as a local dependency of grunt-i18n-abide.\n\n' +

                         'Run the following command:\n' +
                         'rm -rf node_modules/jsxgettext\n\n' +

                         'Then run:\n' +
                         'npm install grunt-i18n-abide --save-dev');
      }
      done();
    });
  });
};
