'use strict';

var grunt = require('grunt');
var contains = require('./helpers');

exports.merge = {
  setUp: function(done) {
    done();
  },
  testUS: function(test) {
    test.expect(2);
    var created = 'tests/tmp/en_US/LC_MESSAGES/messages.po';
    test.ok(grunt.file.exists(created));
    test.ok(contains('updated1', grunt.file.read(created)));
    test.done();
  },
  testFR: function(test) {
    test.expect(2);
    var created = 'tests/tmp/fr/LC_MESSAGES/messages.po';
    test.ok(grunt.file.exists(created));
    test.ok(contains('updated1', grunt.file.read(created)));
    test.done();
  },
  testES: function(test) {
    test.expect(2);
    var created = 'tests/tmp/es/LC_MESSAGES/messages.po';
    test.ok(grunt.file.exists(created));
    test.ok(contains('updated1', grunt.file.read(created)));
    test.done();
  },
};
