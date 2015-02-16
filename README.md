[![Build Status](https://travis-ci.org/mozilla/grunt-i18n-abide.svg?branch=master)](https://travis-ci.org/mozilla/grunt-i18n-abide)
[![NPM version](https://badge.fury.io/js/grunt-i18n-abide.svg)](http://badge.fury.io/js/grunt-i18n-abide)
[![Dependency Status](https://david-dm.org/mozilla/grunt-i18n-abide.svg?theme=shields.io)](https://david-dm.org/mozilla/grunt-i18n-abide)


# grunt-i18n-abide

> Grunt plugin for running `jsxgettext` and `gettext` tools against your
codebase. `jsxgettext` extracts strings from your JS and template files
(EJS/Jinja (nunjucks)) to a pot format.

## Upgrade notes

Version 0.0.20 of `i18n-abide` has changed how it handles locales with
script subtags. E.g. `sr_LATN` now becomes `sr_Latn`. In other words
locales with script subtags are now formatted so the initial character
of the subtag is capitalized and the remainder is lower-case. If you're
using `i18n-abide` >= 0.0.20 rename any locales from `xx_XXXX` to `xx_Xxxx`.
If you're using 0.0.20 of `i18n-abide` you should also upgrade to
`grunt-i18n-abide` >= 0.0.11.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check
out the [Getting Started](http://gruntjs.com/getting-started) guide, as it
explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile)
as well as install and use Grunt plugins. Once you're familiar with that
process, you may install this plugin with this command:

```shell
npm install grunt-i18n-abide --save-dev
```

Once the plugin has been installed, it may be enabled inside your
Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-i18n-abide');
```

## The tasks

* abideExtract
* abideCreate
* abideMerge
* abideCompile

## The `abideExtract` task

### Overview
In your project's Gruntfile, add a section named `abideExtract` to the
data object passed into `grunt.initConfig()`.

This example show two targets for extracting strings from JS and HTML.
They both use the same destination.

```js
  abideExtract: {
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
  }
```

### Files

#### src
Standard grunt files src config allowing a set of paths to make up the list
of files that are searched for gettext strings.

#### dest
Standard grunt files dest config allowing configuration of where the pot file
should be created.

Default value: `locale/templates/LC\_MESSAGES/messages.pot`

### Options

#### options.join
Type: `Boolean`
Default value: `true`

Join messages that already exist.

#### options.keyword
Type: `String`

A way to specify what gettext function you are using e.g. '_' for
_('Translate this')

#### options.language
Type: `String`
Default value: `'JavaScript'`

A string value to tell `jsxgettext` what type of code you are
extracting strings from.

## The `abideCreate` task

### Overview
In your project's Gruntfile, add a section named `abideCreate` to
the data object passed into `grunt.initConfig()`.

### Options
```js
  abideCreate: {
    default: { // Target name.
      options: {
        template: 'locale/templates/LC_MESSAGES/messages.pot', // (default: 'locale/templates/LC_MESSAGES/messages.pot')
        languages: ['en-US', 'fr', 'es'],
        localeDir: 'locale',
      }
    }
  },
```

### Options

#### options.template
Type: `String`
Default value: `locale/templates/LC\_MESSAGES/messages.pot`

The path to the template pot file strings are extracted to.

#### options.languages
Type: `Array`

A list of the language codes you want to create locales for e.g. en-US not
en_US.

#### options.localeDir
Type: `String`
Default value: `locale`

The base locale directory.


## The `abideMerge` task

### Overview
In your project's Gruntfile, add a section named `abideMerge` to the data
object passed into `grunt.initConfig()`.

This command merges newly extracted strings into the locales.

### Options
```js
  abideMerge: {
    default: { // Target name.
      options: {
        template: 'locale/templates/LC_MESSAGES/messages.pot', // (default: 'locale/templates/LC_MESSAGES/messages.pot')
        localeDir: 'locale',
      }
    }
  },
```

### Options

#### options.template
Type: `String`
Default value: `locale/templates/LC\_MESSAGES/messages.pot`

The path to the template pot file strings are extracted to.

#### options.localeDir
Type: `String`
Default value: `locale`

The base locale directory.


## The `abideCompile` task

### Overview
In your project's Gruntfile, add a section named `abideCompile` to the data
object passed into `grunt.initConfig()`.

This command can take multiple targets, so you can compile more than one set
of files if you want or a mix of mo/JSON.

### Example Conf
```js
  abideCompile: {
    json: {
      dest: '/json/',
      options: {
        type: 'json',
        localeDir: 'tests/tmp',
      }
    },
    mo: {
      options: {
        type: 'mo',
        localeDir: 'tests/tmp',
      }
    }
  },
```

### Files

#### dest
Standard grunt files dest config allowing configuration of where the json
should end up.

### Options

#### options.type
Type: `String`

The type of compilation `mo` or `json`

#### options.createJSFiles
Type: `Boolean`
Default value: `true`

Only relevant when `options.type` is set to `'json'`.
If `false` the JS files won't be created alongside the json. If you don't need
the js e.g. you're not producing a client-side app that uses the JS then set
this to `false`.

#### options.jsVar
Type: `String`
Default value: `json_locale_data`

Allows you to override the JS var used in the JS output. The var is added to
the window object. So by default you'll end up with window.json_locale_data.
This value is crudely validated to help ensure you don't use a reserved word
or an invalid property name.

#### options.localeDir
Type: `String`
Default value: `locale`

The base locale directory.

#### options.lockFileName
Type: `String`
Default value: `grunt-i18n-abide.lock`

An option to customise the lockfile name.

This can be useful if you might be running multiple builds concurrently
on the same server. Set this to use an environment variable or use a grunt
cli option so each job has a unique lockfile name.


## A complete configuration example

```
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  abideCreate: {
    default: { // Target name.
      options: {
        template: 'locale/templates/LC_MESSAGES/messages.pot', // (default: 'locale/templates/LC_MESSAGES/messages.pot')
        languages: ['en-US', 'fr', 'es'],
        localeDir: 'locale',
      }
    }
  },
  abideExtract: {
    js: {
      src: 'lib/**/*.js',
      dest: 'locale/templates/LC_MESSAGES/messages.pot',
      options: {
        language: 'JavaScript',
      }
    },
    html: {
      src: 'templates/payments/*.html',
      dest: 'locale/templates/LC_MESSAGES/messages.pot',
      options: {
        language: 'Jinja',
      }
    },
  },
  abideMerge: {
    default: { // Target name.
      options: {
        template: 'locale/templates/LC_MESSAGES/messages.pot', // (default: 'locale/templates/LC_MESSAGES/messages.pot')
        localeDir: 'locale',
      }
    }
  },
  abideCompile: {
    json: {
      dest: 'media/locale/',
      options: {
        type: 'json',
        createJSFiles: false, // defaults to true
      }
    },
    mo: {
      options: {
        type: 'mo',
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test
your code using [Grunt](http://gruntjs.com/).

### Where to file bugs

Bear in mind this code only wraps `jsxgettext` and standard `gettext` tools.
If there's a problem with how grunt talks to `jsxgettext` or those CLI tools
then that's a problem with this package. However if the output is not correct
(and it's not related to configuration) please file a bug on the relevant
project.

## Release History

See https://github.com/mozilla/grunt-i18n-abide/releases
