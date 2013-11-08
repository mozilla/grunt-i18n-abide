'use strict';

var grunt = require('grunt');

exports.jsxgettext = {
  setUp: function(done) {
    done();
  },
  testUS: function(test) {
    test.expect(1);
    var created = 'tests/tmp/en_US/LC_MESSAGES/messages.po';
    test.ok(grunt.file.exists(created));
    test.done();
  },
  testFR: function(test) {
    test.expect(1);
    var created = 'tests/tmp/fr/LC_MESSAGES/messages.po';
    test.ok(grunt.file.exists(created));
    test.done();
  },
  testES: function(test) {
    test.expect(1);
    var created = 'tests/tmp/es/LC_MESSAGES/messages.po';
    test.ok(grunt.file.exists(created));
    test.done();
  },
};
