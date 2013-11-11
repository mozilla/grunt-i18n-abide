'use strict';

var grunt = require('grunt');
var contains = require('./helpers');
var path = require('path');
var shell = require('shelljs');

exports.extract = {
  setUp: function(done) {
    done();
  },
  testCommandNotExist: function(test) {
    test.expect(1);
    var result = shell.exec('grunt abideExtract:noexist');
    test.ok(contains('Fatal error: Command "tests/bin/whatevs.sh" doesn\'t exist!', result.output));
    test.done();
  },
  testCommandNonZeroExit: function(test) {
    test.expect(1);
    var result = shell.exec('grunt abideExtract:badcmd');
    test.ok(contains('Fatal error: Command "tests/bin/sad.sh', result.output));
    test.done();
  },
  testBasic: function(test) {
    test.expect(2);
    var created = 'tests/tmp/basic.pot';
    var expected = 'tests/expected/basic.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
  testJinja: function(test) {
    var created = 'tests/tmp/jinja.pot';
    var expected = 'tests/expected/jinja.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
  testJinjaKeyword: function(test) {
    test.expect(2);
    var created = 'tests/tmp/jinja-keyword.pot';
    var expected = 'tests/expected/jinja-keyword.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
  testJoin: function(test) {
    test.expect(2);
    var created = 'tests/tmp/join.pot';
    var expected = 'tests/expected/join.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
  testSorted: function(test) {
    test.expect(2);
    var created = 'tests/tmp/sorted.pot';
    var expected = 'tests/expected/sorted.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
};
