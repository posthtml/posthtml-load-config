[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][travis]][travis-url]
[![Coverage][cover]][cover-url]
[![Standard Code Style][style]][style-url]

<div align="center">
  <a href="https://github.com/posthtml/posthtml">
    <img width="180" height="180"
      src="http://posthtml.github.io/posthtml/logo.svg">
  </a>
  <h1>Load Config Plugin</h1>
  <p>Autoloads the common config for PostHTML<p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D posthtml-load-config
```

<h2 align="center">Usage</h2>

Install plugin as usual and make sure saving them to your ***package.json*** dependencies and/or devDependencies.

```
npm i -S posthtml-plugin
```
```
npm i -D posthtml-plugin
```

After installing your plugins there a two common ways to declare your plugins and options.

- Create **posthtml** section in your projects **package.json**.
- Create a **posthtml.config.js**  or  **posthtmlrc.json** file.

### Options

Plugin **options** can either take ```false``` or an object literal ```{}```
as value.

```false```: Load plugin with no options (plugin defaults)

```[Object]```: Load plugin with given options

### Ordering

Plugin **order** will be determined by declaration in plugins section.

```js
posthtml: {
  parser: 'sugarml',
  plugins: {
    'posthtml-plugin1': false,
    'posthtml-plugin2': false,
    'posthtml-plugin3': {}
  }
}

// Loaded Options Setup
{
  parser: require('sugarml'),
}

// Loaded Plugin Setup
[
  require('posthtml-plugin1')(),
  require('posthtml-plugin2')(),
  require('posthtml-plugin3')(options)
]
```

<h2 align="center">Examples</h2>

### package.json

```json
{
 "dependencies": {
   "posthtml-bem": "^0.2.2",
   "posthtml-import": "^8.1.2"
 },
 "posthtml": {
   "sync": false,
   "skipParse": false,
   "plugins": {
     "posthtml-import": false,
     "posthtml-bem":  {
       "elemPrefix": "__",
       "modPrefix": "--",
       "modDlmtr": "-"
      }
    }
  }
}
```

### posthtml.config.js

```js
export default {
  parser: 'sugarml',
  plugins: {
    'posthtml-import': false,
    'posthtml-bem':  {
      elemPrefix: '__',
      modPrefix: '--',
      modDlmtr: '-'
    }
  }
}
```
### posthtmlrc.json

```json
{
  "parser": "sugarml",
  "plugins": {
    "posthtml-import": false,
    "posthtml-bem":  {
      "elemPrefix": "__",
      "modPrefix": "--",
      "modDlmtr": "-"
    }
  }
}
```

<h2 align="center">Usage</h2>

### Default

```js
'use strict'

const fs = require('fs')

const posthtml = require('posthtml')
const posthtmlrc = require('posthtml-load-config')

const html = fs.readFileSync('./index.html', 'utf-8')

posthtmlrc().then(({ plugins, options }) => {
  posthtml(plugins)
    .process(html, options)
    .then(result => console.log(result.html))
}))
```

### Custom

```js
'use strict'

const fs = require('fs')

const posthtml = require('posthtml')
const posthtmlrc = require('posthtml-load-config')

const html = fs.readFileSync('./index.html', 'utf-8')

const config = {
  sync: true,
  plugins: {
    'posthtml-exp': false
  }
}

posthtmlrc(config).then(({ plugins, options }) => {
  posthtml(plugins) // [...loaded, require('posthtml-exp')() ]
    .process(html, options) // { parser: require('sugarml'), sync: true }
    .then(result => console.log(result.html))
}))
```

<h2 align="center">LICENSE</h2>

> License (MIT)

> Copyright (c) 2016 PostHTML Michael Ciniawsky <michael.ciniawsky@gmail.com>

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm]: https://img.shields.io/npm/v/posthtml-load-config.svg
[npm-url]: https://npmjs.com/package/posthtml-load-config

[deps]: https://david-dm.org/posthtml/posthtml-load-config.svg
[deps-url]: https://david-dm.org/posthtml/posthtml-load-config

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[travis]: http://img.shields.io/travis/posthtml/posthtml-load-config.svg?branch=master
[travis-url]: https://travis-ci.org/posthtml/posthtml-load-config?branch=master

[cover]: https://coveralls.io/repos/github/posthtml/posthtml-load-config/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/posthtml-load-config?branch=master
