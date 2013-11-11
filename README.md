[![Build Status](https://travis-ci.org/muffinresearch/grunt-i18n-abide.png?branch=master)](https://travis-ci.org/muffinresearch/grunt-i18n-abide)

# grunt-i18n-abide

> Grunt plugin for running `jsxgettext` and `gettext` tools against your codebase. `jsxgettext` extracts strings from your JS
and template files (EJS/Jinja (nunjucks)) to a pot format.

**Note: It's early days for this, and (despite the docs below) it's not in npm just yet until I iron out any kinks.**

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-i18n-abide --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-i18n-abide');
```

## The tasks

* abide-extract
* abide-create
* abide-merge
* abide-compile

## The `abide-extract` task

### Overview
In your project's Gruntfile, add a section named `abide-extract` to the data object passed into `grunt.initConfig()`.

This example show two targets for extracting strings from JS and HTML. They both use the same destination.

```js
  'abide-extract': {
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
Standard grunt files src config allowing a set of paths to make up the list of files that are searched for gettext strings.

#### dest
Standard grunt files dest config allowing configuration of where the pot file should be created.
Default value: `locale/templates/LC\_MESSAGES/messages.pot`

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

## The `abide-create` task

### Overview
In your project's Gruntfile, add a section named `abide-create` to the data object passed into `grunt.initConfig()`.

### Options
```js
  'abide-create': {
    default: { // Target name.
      options: {
        template: 'locale/templates/LC_MESSAGES/messages.pot', // (default: 'locale/templates/LC_MESSAGES/messages.pot')
        locales: ['en_US', 'fr', 'es'],
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

#### options.locales
Type: `Array`

A list of the locales you want to create.

#### options.template
Type: `String`
Default value: `locale`

The base locale directory.


## The `abide-merge` task

### Overview
In your project's Gruntfile, add a section named `abide-merge` to the data object passed into `grunt.initConfig()`.

This command merges newly extracted strings into the locales.

### Options
```js
  'abide-merge': {
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


## The `abide-compile` task

### Overview
In your project's Gruntfile, add a section named `abide-compile` to the data object passed into `grunt.initConfig()`.

This command can take multiple targets, so you can compile more than one set of files if you want or a mix of mo/JSON.

### Example Conf
```js
  'abide-compile': {
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
Standard grunt files dest config allowing configuration of where the json should end up.

### Options

#### options.type
Type: `String`

The type of compilation `mo` or `json`

#### options.localeDir
Type: `String`
Default value: `locale`

The base locale directory.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

### Where to file bugs

Bear in mind this code only wraps `jsxgettext` and standard `gettext` tools. If there's a problem with how grunt talks to `jsxgettext` or those CLI tools then that's a problem with this package. However if the output is not correct (and it's not related to configuration) please file a bug on the relevant project.

## Release History

* 0.0.1: Initial version.
