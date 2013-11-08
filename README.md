[![Build Status](https://travis-ci.org/muffinresearch/grunt-jsxgettext.png?branch=master)](https://travis-ci.org/muffinresearch/grunt-jsxgettext)

# grunt-jsxgettext

> Grunt plugin for running jsxgettext against your codebase. jsxgettext extracts strings from your JS
and template files (EJS/Jinja (nunjucks)) to a pot format.

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

This example show two targets for extracting strings from JS and HTML. They both use the same destination.

```js
grunt.initConfig({
  jsxgettext: {
    js: {
      src: 'lib/**/*.js',
      dest: 'locale/templates/LC_MESSAGES/messages.pot',
      options: {
        language: 'JavaScript',
      }
    },
    html: {
      src: 'templates/**/*.html',
      dest: 'locale/templates/LC_MESSAGES/messages.pot',
      options: {
        language: 'Jinja',
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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

### Where to file bugs

Bear in mind this code only wraps jsxgettext. If there's a problem with how grunt talks to jsxgettext then that's a problem with this package. However if the output is not correct (and it's not related to configuration) please file a bug on jsxgettext.

## Release History

* 0.1.0: Initial version.
