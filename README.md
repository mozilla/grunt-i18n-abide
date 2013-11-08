# grunt-jsxgettext

> Grunt plugin for running jsxgettext against your codebase.

**Note: It's early days for this, and (despite the docs below) it's not in npm just yet until I iron out any kinks.**

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsxgettext --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsxgettext');
```

## The "jsxgettext" task

### Overview
In your project's Gruntfile, add a section named `jsxgettext` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jsxgettext: {
    target: {
      src: ['test/fixtures/basic*.js'],
      dest: 'test/tmp/basic.po',
      options: {
        language: 'JavaScript',
        sorted: false,
        join: false,
      }
    },
  },
})
```

### Options

#### options.join
Type: `Boolean`
Default value: `true`

Join messages that already exist.

#### options.keyword
Type: `String`

A way to specify what gettext function you are using e.g. '_' for _('Translate this')

#### options.language
Type: `String`
Default value: `'JavaScript'`

A string value to tell `jsxgettext` what type of code you are extracting strings from.

#### options.sort
Type: `Boolean`
Default value: `true`

Whether to sort extracted strings.

### Usage Examples
#### Basic Config

This example we are extracting from JS files in path/to/js and sorting and joining are turned off.

```js
grunt.initConfig({
  jsxgettext: {
    src: ['path/to/js/*.js'],
    dest: 'test/tmp/stuff.po',
    options: {
      language: 'JavaScript',
      sort: false,
      join: false,
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1.0: Initial version.
