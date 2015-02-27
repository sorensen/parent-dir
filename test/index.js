'use strict';

var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , dir = __dirname
  , main = path.join(dir, '/../index.js')
  , ase = assert.strictEqual

describe('Parent.js', function() {
  it('works', function() {
    var copy = path.join(dir, '/module.js/node_modules/parent.js/index.js')
    
    var parent = require('../index')
    ase(parent, path.join(__dirname, '/../node_modules/mocha/bin'))

    fs.writeFileSync(copy, fs.readFileSync(main))
    delete require.cache[require.resolve('../index')]

    var module = require('./module.js/index')
    ase(module, path.join(__dirname, '/module.js'))

    // delete require.cache[require.resolve('../index')]
    try { fs.unlinkSync(copy) } catch (e) {}
  })
})
