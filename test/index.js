// ------------------------------------
// #POSTHTML - LOAD CONFIG - TEST
// ------------------------------------

'use strict'

const test = require('ava')

const posthtml = require('posthtml')
const posthtmlrc = require('../index')

const { readFileSync, writeFileSync } = require('fs')

function readSync (path) {
  return readFileSync(path, 'utf8')
}

function writeSync (path, file) {
  return writeFileSync(path, file, 'utf8')
}

// Fixtures
const html = readSync('./fixtures/index.html', 'utf8')

test('Process HTML with default config', (t) => {
  posthtmlrc().then(({plugins, options}) => {
    posthtml(plugins)
      .process(html, options)
      .then(result => {
        writeSync('./expect/index.html', result.html)
        t.equal(result.html, readSync('./expect/index.html'))
      })
  })
})

test('Process HTML with custom config provided as string', (t) => {
  posthtmlrc('./posthtml.config.js').then(({plugins, options}) => {
    posthtml(plugins)
      .process(html, options)
      .then(result => {
        writeSync('./expect/index.string.html', result.html)
        t.equal(result.html, readSync('./expect/index.html'))
      })
  })
})

test('Process HTML with custom config provided as object', (t) => {
  posthtmlrc('./posthtmlrc.json').then(({plugins, options}) => {
    posthtml(plugins)
      .process(html, options)
      .then(result => {
        writeSync('./expect/index.object.html', result.html)
        t.equal(result.html, readSync('./expect/index.html'))
      })
  })
})
