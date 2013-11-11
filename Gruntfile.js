/*
 * grunt-abide-extract
 * https://github.com/muffinresearch/grunt-abide-extract
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
    'abide-extract': {
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
          sort: true
        }
      },
      messages: {
        src: ['tests/fixtures/sorted.js'],
        dest: 'tests/tmp/messages.pot',
        options: {
          language: 'JavaScript',
        }
      },
      updated: {
        src: ['tests/fixtures/updated.js'],
        dest: 'tests/tmp/messages.pot',
        options: {
          language: 'JavaScript',
        }
      },
      badcmd: {
        src: ['tests/fixtures/updated.js'],
        dest: 'tests/tmp/messages.pot',
        options: {
          language: 'JavaScript',
          cmd: 'tests/bin/sad.sh',
        }
      },
      noexist: {
        src: ['tests/fixtures/updated.js'],
        dest: 'tests/tmp/messages.pot',
        options: {
          language: 'JavaScript',
          cmd: 'tests/bin/whatevs.sh',
        }
      },
    },

    // Configuration to be run (and then tested).
    'abide-create': {
      default: {
        options: {
          template: 'tests/tmp/messages.pot',
          locales: projectLocales,
          localeDir: 'tests/tmp',
        }
      }
    },

    // Configuration to be run (and then tested).
    'abide-merge': {
      default: {
        options: {
          template: 'tests/tmp/messages.pot',
          localeDir: 'tests/tmp',
        }
      }
    },

    // Configuration to be run (and then tested).
    'abide-compile': {
      json: {
        dest: 'tests/tmp/json/',
        options: {
          type: 'json',
          localeDir: 'tests/tmp',
        }
      },
      mo: {
        options: {
          localeDir: 'tests/tmp',
                     type: 'mo',
        }
      },
      noexistmo: {
        options: {
          type: 'mo',
          cmd: 'tests/bin/whatevs.sh',
          localeDir: 'tests/tmp',
        }
      },
      noexistjson: {
        dest: 'tests/tmp/json/',
        options: {
          type: 'json',
          cmd: 'tests/bin/whatevs.sh',
          localeDir: 'tests/tmp',
        }
      },
      badcmd: {
        options: {
          type: 'mo',
          cmd: 'tests/bin/sad.sh',
          localeDir: 'tests/tmp',
        }
      },
      nodestjson: {
        options: {
          type: 'json',
          cmd: 'tests/bin/sad.sh',
          localeDir: 'tests/tmp',
        }
      },

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
    'jshint',
    'clean',

    // Extract the strings.
    'abide-extract:basic',
    'abide-extract:jinja',
    'abide-extract:jinjaKeyword',
    'abide-extract:join1',
    'abide-extract:join2',
    'abide-extract:sorted',

    // First extraction of tests/tmp/messages.pot
    'abide-extract:messages',

    // Create the locales.
    'abide-create',

    // Updated extraction of tests/tmp/messages.pot
    'abide-extract:updated',

    // Run the merge to update locales.
    'abide-merge',

    // Compile JSON + mo.
    'abide-compile:json',
    'abide-compile:mo',

    // Test all the things.
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
