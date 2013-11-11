'use strict';

var grunt = require('grunt');
var contains = require('./helpers');
var shell = require('shelljs');


exports.merge = {
  setUp: function(done) {
    done();
  },
  testCommandNoExist: function(test) {
    test.expect(1);
    var result = shell.exec('grunt abide-merge:commandnoexist');
    test.ok(contains('Fatal error: Command "tests/bin/whatevs.sh" doesn\'t exist!', result.output));
    test.done();
  },
  testTemplateNoExist: function(test) {
    test.expect(1);
    var result = shell.exec('grunt abide-merge:templatenoexist');
    test.ok(contains('Fatal error: template file "tests/tmp/noexist.pot" does not exist', result.output));
    test.done();
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
