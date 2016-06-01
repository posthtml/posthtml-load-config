// ------------------------------------
// #POSTHTML - LOAD OPTIONS - TEST
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
// const sml = readSync('./fixtures/index.sml', 'utf8')
const html = readSync('./fixtures/index.html', 'utf8')

test('Process HTML with default config', (t) => {
  posthtmlrc().then(({plugins, options}) => {
    posthtml(plugins)
      .process(html, options)
      .then(result => {
        writeSync('./expect/index.html')
        t.equal(result.css, readSync('./expect/index.html'))
      })
  })
})

// test('Process SML with default config', (t) => {
//   posthtmlrc().then(({plugins, options}) => {
//     posthtml(plugins)
//       .process(sml, options)
//       .then(result => {
//         writeSync('./expect/index.sml.html')
//         t.equal(result.css, readSync('./expect/index.sml.html'))
//       })
//   })
// })

test('Process HTML with custom config provided as string', (t) => {
  posthtmlrc('posthtml.config.js').then(({plugins, options}) => {
    posthtml(plugins)
      .process(html, options)
      .then(result => {
        writeSync('./expect/index.html')
        t.equal(result.css, readSync('./expect/index.html'))
      })
  })
})

test('Process HTML with custom config provided as object', (t) => {
  posthtmlrc('posthtmlrc.json').then(({plugins, options}) => {
    posthtml(plugins)
      .process(html, options)
      .then(result => {
        writeSync('./expect/index.html')
        t.equal(result.css, readSync('./expect/index.html'))
      })
  })
})
