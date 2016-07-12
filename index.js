// ------------------------------------
// #POSTHTML - LOAD CONFIG
// ------------------------------------

'use strict'

const config = require('cosmiconfig')

const loadOptions = require('posthtml-load-options/lib/loadOptions')
const loadPlugins = require('./lib/loadPlugins')

module.exports = function loadConfig (options) {
  return config('posthtml')
    .catch((error) => console.log(error))
    .then((result) => {
      return {
        plugins: loadPlugins(result.config, options),
        options: loadOptions(result.config, options)
      }
    })
}
