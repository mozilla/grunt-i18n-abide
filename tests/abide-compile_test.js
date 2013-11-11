'use strict';

var grunt = require('grunt');
var contains = require('./helpers');

exports.compile = {
  testUS: function(test) {
    test.expect(5);
    var jsFile = 'tests/tmp/json/en_US/messages.js';
    var jsonFile = 'tests/tmp/json/en_US/messages.json';
    var moFile = 'tests/tmp/en_US/LC_MESSAGES/messages.mo';
    test.ok(grunt.file.exists(jsFile));
    test.ok(grunt.file.exists(jsonFile));
    test.ok(grunt.file.exists(moFile));
    test.ok(contains('updated1', grunt.file.read(jsFile)));
    test.ok(contains('updated1', grunt.file.read(jsonFile)));
    test.done();
  },
  testFR: function(test) {
    test.expect(5);
    var jsFile = 'tests/tmp/json/fr/messages.js';
    var jsonFile = 'tests/tmp/json/fr/messages.json';
    var moFile = 'tests/tmp/fr/LC_MESSAGES/messages.mo';
    test.ok(grunt.file.exists(jsFile));
    test.ok(grunt.file.exists(jsonFile));
    test.ok(grunt.file.exists(moFile));
    test.ok(contains('updated1', grunt.file.read(jsFile)));
    test.ok(contains('updated1', grunt.file.read(jsonFile)));
    test.done();
  },
  testES: function(test) {
    test.expect(5);
    var jsFile = 'tests/tmp/json/es/messages.js';
    var jsonFile = 'tests/tmp/json/es/messages.json';
    var moFile = 'tests/tmp/es/LC_MESSAGES/messages.mo';
    test.ok(grunt.file.exists(jsFile));
    test.ok(grunt.file.exists(jsonFile));
    test.ok(grunt.file.exists(moFile));
    test.ok(contains('updated1', grunt.file.read(jsFile)));
    test.ok(contains('updated1', grunt.file.read(jsonFile)));
    test.done();
  },
};
