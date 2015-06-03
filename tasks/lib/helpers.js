var fs = require('fs');
var os = require('os');
var path = require('path');
var util = require('util');

var shell = require('shelljs');
var grunt = require('grunt');

var lockFileRx = /^[a-z0-9_\-.]+$/;
var IS_WIN = /^win/.test(process.platform);


exports.getLockFilePath = function(fileName) {
  if (!lockFileRx.test(fileName)) {
    grunt.fail.fatal('Invalid lockFileName: "' + fileName + '" + must match ' + lockFileRx.toString());
  }
  return path.join(os.tmpdir(), fileName || 'grunt-i18n-abide.lock');
};


exports.runShellSync = function runShellSync(cmd, args) {
  args.splice(0, 0, cmd);
  var command = exports.escapeArgsList(args);
  var result = shell.exec(command);
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
  var lockFilePath = exports.getLockFilePath(lockFileName);
  var fd = fs.openSync(lockFilePath, 'w');
  fs.closeSync(fd);
};


exports.removeLockFile = function removeLockFile(lockFileName) {
  var lockFilePath = exports.getLockFilePath(lockFileName);
  fs.unlinkSync(lockFilePath);
};


exports.lockFileExists = function lockFileExists(lockFileName) {
  var lockFilePath = exports.getLockFilePath(lockFileName);
  return grunt.file.isFile(lockFilePath);
};

// X-platform shell escaping based on http://qntm.org/cmd
exports.escapeArg = function(arg, isWin) {
  isWin = isWin === true ? isWin : IS_WIN;
  // Windows cmd.exe:
  if(isWin) {
    // Sequence of backslashes followed by a double quote:
    //  double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');

    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(\\*)$/, '$1$1');

    // All other backslashes occur literally
    // Quote the whole thing:
    arg = '"' + arg + '"';

    // Escape shell metacharacters:
    arg = arg.replace(/([()%!^"<>&|;, ])/g, '^$1');
  } else {
    // Backslash-escape any hairy characters:
    arg = arg.replace(/([^a-zA-Z0-9_])/g, '\\$1');
  }
  return arg;
};

exports.escapeCmd = function(cmd, isWin) {
  isWin = isWin === true ? isWin : IS_WIN;
  // Windows cmd.exe: needs special treatment
  if(isWin) {
    // Escape shell metacharacters
    cmd = cmd.replace(/([()%!^"<>&|;, ])/g, '^$1');
  } else {
    // Unix shells: same procedure as for arguments
    cmd = exports.escapeArg(cmd);
  }
  return cmd;
};

exports.escapeArgsList = function(argList, isWin) {

  isWin = isWin === true ? isWin : IS_WIN;
  var newArgList = argList.map(function(val, index) {
    if (index === 0) {
      return exports.escapeCmd(val, isWin);
    } else {
      return exports.escapeArg(val, isWin);
    }
  });
  return newArgList.join(' ');
};
