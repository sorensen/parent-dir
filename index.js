'use strict';

/*!
 * Module dependencies.
 */

var path = require('path')
  , name = require('./package.json').name
  , debug = require('debug')(name)

/**
 * Find the parent app directory by looking up the directory
 * tree until there is is no `package.json` file found or there is 
 * no `node_modules` directory found.
 *
 * This task is syncronous as it should only ever be ran once at 
 * app startup, then cached by `require`
 *
 * @returns {String} directory
 */

module.exports = (function() {
  if (~__dirname.indexOf('node_modules')) {
    debug('walking `node_modules` dir')

    var dir = module.id

    while (path.basename(dir) !== 'node_modules') {
      debug('walking `%s`', dir)
      dir = path.dirname(dir)
    }
    return path.dirname(dir)
  }

  debug('walking module parent tree')

  // Not installed as a module, possibly included with `npm link`
  var dir = module

  while (dir.parent) {
    debug('walking `%s`', dir.id)
    dir = dir.parent
  }
  return path.dirname(dir.filename)
})()
