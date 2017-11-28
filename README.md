# Password Generator for Atom

[![Build Status](https://travis-ci.org/maxkoryukov/atom-password-generator.svg?branch=master)](https://travis-ci.org/maxkoryukov/atom-password-generator)

Add generation of passwords in different strengths to the command palette:

* Generate short password: 10 alphanumeric characters
* Generate medium password: 15 alphanumeric characters
* Generate long password: 20 alphanumeric characters

Hotkeys:

`Ctrl + Alt + P` - generate medium password.

### Human confusing chars

There is a set of chars which could be interpreted wrong at the glance:

* `l` small L
* `I` capital i
* `|` vertical bar
* `1` one
* `0` zero
* `O` capital O letter
* `$` dollar sign

By default, the package avoids these letters, but you can enable using them
in the configuration at any time.

## CREDITS

Inspired by [Generate Password package for Sublime 3](https://packagecontrol.io/packages/Generate%20Password)

## LICENSE

**MIT**

But check updates: [LICENSE] on GitHub

  [LICENSE]: https://github.com/maxkoryukov/atom-password-generator/blob/master/LICENSE.md
