var fs = require('fs');
var os = require('os');
var path = require('path');
var util = require('util');

var shell = require('shelljs');
var grunt = require('grunt');

var lockFileRx = /^[a-z0-9_\-.]+$/;

function getLockFilePath(fileName) {
  if (!lockFileRx.test(fileName)) {
    grunt.fail.fatal('Invalid lockFileName: "' + fileName + '" + must match ' + lockFileRx.toString());
  }
  return path.join(os.tmpdir(), fileName || 'grunt-i18n-abide.lock');
}

exports.getLockFilePath = getLockFilePath;

exports.runShellSync = function runShellSync(cmd, args) {
  args.splice(0, 0, cmd);
  var command = args.join(' ');
  var result = shell.exec(args.join(' '));
  if (result.code !== 0) {
    grunt.fail.fatal('Command "' + command + '" exited with a non-zero status');
  }
  return result;
};


exports.getCommand = function getCommand(cmd) {
  // Returns the full path of the command via shell.which or errors if it
  // doesn't exist.
  var cmdFullPath = shell.which(cmd);
  if (cmdFullPath === null) {
    grunt.fail.fatal('Command "' + cmd + '" doesn\'t exist! Maybe you need to install it.');
  }
  return cmdFullPath;
};


exports.createLockFile = function createLockFile(lockFileName) {
  var lockFilePath = getLockFilePath(lockFileName);
  var fd = fs.openSync(lockFilePath, 'w');
  fs.closeSync(fd);
};


exports.removeLockFile = function removeLockFile(lockFileName) {
  var lockFilePath = getLockFilePath(lockFileName);
  fs.unlinkSync(lockFilePath);
};


exports.lockFileExists = function lockFileExists(lockFileName) {
  var lockFilePath = getLockFilePath(lockFileName);
  return grunt.file.isFile(lockFilePath);
};
