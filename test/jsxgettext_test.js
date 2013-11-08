'use strict';

var grunt = require('grunt');
var contains = function(needle, haystack) {
  return haystack.indexOf(needle) > -1;
};

exports.jsxgettext = {
  setUp: function(done) {
    done();
  },
  testBasic: function(test) {
    test.expect(2);
    var created = 'test/tmp/basic.po';
    var expected = 'test/expected/basic.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
  testJinja: function(test) {
    var created = 'test/tmp/jinja.po';
    var expected = 'test/expected/jinja.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
  testJinjaKeyword: function(test) {
    test.expect(2);
    var created = 'test/tmp/jinja-keyword.po';
    var expected = 'test/expected/jinja-keyword.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
  testJoin: function(test) {
    test.expect(2);
    var created = 'test/tmp/join.po';
    var expected = 'test/expected/join.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
  testSorted: function(test) {
    test.expect(2);
    var created = 'test/tmp/sorted.po';
    var expected = 'test/expected/sorted.pot';
    test.ok(grunt.file.exists(created));
    test.ok(contains(grunt.file.read(expected), grunt.file.read(created)));
    test.done();
  },
};
