// ------------------------------------
// #POSTHTML - LOAD OPTIONS
// ------------------------------------

'use strict'

const path = require('path')

module.exports = function loadOptions (config, options) {
  // apply custom options
  if (typeof options === 'string') {
    options = require(path.join(process.cwd(), options))

    for (let option in options) {
      config[option] = options[option]
    }
  }

  if (typeof options === 'object') {
    for (let option in options) {
      config[option] = options[option]
    }
  }

  if (options === undefined) {
    options = config
  }

  // remove plugins section
  if (options.plugins) {
    delete options.plugins
  }

  return options
}
