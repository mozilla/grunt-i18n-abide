/*
 * grunt-jsxgettext
 * https://github.com/muffinresearch/grunt-jsxgettext
 *
 * Copyright (c) 2013 Stuart Colville
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

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
      test: ['test/tmp/*'],
    },

    // Configuration to be run (and then tested).
    jsxgettext: {
      basic: {
        src: ['test/fixtures/basic*.js'],
        dest: 'test/tmp/basic.po',
        options: {
          language: 'JavaScript',
        }
      },
      jinja: {
        src: ['test/fixtures/jinja.html'],
        dest: 'test/tmp/jinja.po',
        options: {
          language: 'Jinja',
        }
      },
      jinjaKeyword: {
        src: ['test/fixtures/jinja-keyword.html'],
        dest: 'test/tmp/jinja-keyword.po',
        options: {
          language: 'Jinja',
          keyword: '_',
        }
      },
      join1: {
        src: ['test/fixtures/join1.js'],
        dest: 'test/tmp/join.po',
        options: {
          language: 'JavaScript',
          join: true,
        }
      },
      join2: {
        src: 'test/fixtures/join2.js',
        dest: 'test/tmp/join.po',
        options: {
          language: 'JavaScript',
          join: true,
        }
      },
      sorted: {
        src: 'test/fixtures/sorted.js',
        dest: 'test/tmp/sorted.po',
        options: {
          language: 'JavaScript',
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
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
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
