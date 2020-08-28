// -------------------------------------
// #POSTHTML - LOAD CONFIG - TEST - PKG
// -------------------------------------

'use strict'

const test = require('ava')

const read = require('fs').readFileSync
const join = require('path').join

const fixture = (file) => {
  return read(join(__dirname, 'fixtures', file), 'utf8')
}

const expect = (file) => {
  return read(join(__dirname, 'expect', file), 'utf8')
}

function posthtml (config, fix, log) {
  return require('posthtml')(config.plugins)
    .process(fixture(fix), config.options)
    .then((result) => {
      if (log) {
        console.log(result.html)
        console.log(result.tree.config)
      }

      return result
    })
}

const posthtmlrc = require('../..')

test('package.json - {Object} - Parser SML', (t) => {
  const ctx = {
    cwd: __dirname
  }

  const parser = require('posthtml-sugarml')()

  return posthtmlrc(ctx).then((config) => {
    t.is(config.options.parser.name, parser.name)
    t.is(config.options.from, './fixtures/index.sml')
    t.is(config.options.to, './expect/index.html')
  })
})

test('package.json - {Object} - Process SML', (t) => {
  const ctx = {
    cwd: __dirname
  }

  return posthtmlrc(ctx).then((config) => {
    posthtml(config, 'index.sml', true)
      .then((result) => {
        t.is(expect('index.sml.html'), result.html)
      })
  })
})

test.skip('packagee.json - {Object} - Process HTML', (t) => {
  return posthtmlrc().then((config) => {
    posthtml(config, 'index.html', true)
      .then((result) => {
        t.is(expect('index.html'), result.html)
      })
  })
})

test('package.json - {Object} - Render JS', (t) => {
  const ctx = {
    cwd: __dirname
  }

  return posthtmlrc(ctx).then((config) => {
    t.is(config.options.render, undefined)
    t.is(config.options.from, './fixtures/index.sml')
    t.is(config.options.to, './expect/index.html')
  })
})

test('package.json - {Object} - Render JSX', (t) => {
  const ctx = {
    cwd: __dirname
  }

  return posthtmlrc(ctx).then((config) => {
    t.is(config.options.render, undefined)
    t.is(config.options.from, './fixtures/index.sml')
    t.is(config.options.to, './expect/index.html')
  })
})
