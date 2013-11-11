'use strict';

var grunt = require('grunt');
var shell = require('shelljs');
var contains = require('./helpers');

exports.create = {
  setUp: function(done) {
    done();
  },
  testCommandNoExist: function(test) {
    test.expect(1);
    var result = shell.exec('grunt abideCreate:commandnoexist');
    test.ok(contains('Fatal error: Command "tests/bin/whatevs.sh" doesn\'t exist!', result.output));
    test.done();
  },
  testTemplateNoExist: function(test) {
    test.expect(1);
    var result = shell.exec('grunt abideCreate:templatenoexist');
    test.ok(contains('Fatal error: template file "tests/tmp/noexist.pot" does not exist', result.output));
    test.done();
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
