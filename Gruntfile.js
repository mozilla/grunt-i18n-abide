/*
 * grunt-jsxgettext
 * https://github.com/muffinresearch/grunt-jsxgettext
 *
 * Copyright (c) 2013 Stuart Colville
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var projectLocales = ['en_US', 'fr', 'es'];

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tests/tmp/*'],
    },

    // Configuration to be run (and then tested).
    jsxgettext: {
      basic: {
        src: ['tests/fixtures/basic*.js'],
        dest: 'tests/tmp/basic.pot',
        options: {
          language: 'JavaScript',
        }
      },
      jinja: {
        src: ['tests/fixtures/jinja.html'],
        dest: 'tests/tmp/jinja.pot',
        options: {
          language: 'Jinja',
        }
      },
      jinjaKeyword: {
        src: ['tests/fixtures/jinja-keyword.html'],
        dest: 'tests/tmp/jinja-keyword.pot',
        options: {
          language: 'Jinja',
          keyword: '_',
        }
      },
      join1: {
        src: ['tests/fixtures/join1.js'],
        dest: 'tests/tmp/join.pot',
        options: {
          language: 'JavaScript',
          join: true,
        }
      },
      join2: {
        src: 'tests/fixtures/join2.js',
        dest: 'tests/tmp/join.pot',
        options: {
          language: 'JavaScript',
          join: true,
        }
      },
      sorted: {
        src: 'tests/fixtures/sorted.js',
        dest: 'tests/tmp/sorted.pot',
        options: {
          language: 'JavaScript',
        }
      }
    },

    // Configuration to be run (and then tested).
    jsxcreate: {
      options: {
        template: 'tests/fixtures/messages.pot',
        locales: projectLocales,
        baseDir: 'tests/tmp',
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['tests/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Clean, run the plugin with the above config. Then test the output.
  grunt.registerTask('test', [
    'clean',
    'jsxgettext:basic',
    'jsxgettext:jinja',
    'jsxgettext:jinjaKeyword',
    'jsxgettext:join1',
    'jsxgettext:join2',
    'jsxgettext:sorted',
    'jsxcreate',
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
