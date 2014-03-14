# Derby Boot [![Build Status](https://travis-ci.org/wenzowski/d-bootstrap.png)](https://travis-ci.org/wenzowski/d-bootstrap)
[![Selenium Test Status](https://saucelabs.com/browser-matrix/w-d-bootstrap.svg)](https://saucelabs.com/u/w-d-bootstrap)

A Derby component library for Twitter Bootstrap.

## Install

1. Install with `npm` by adding `d-bootstrap` to your `package.json`.

  ```
  npm i --save d-bootstrap
  ```

2. Include all the bootstrap components in your `app`

  ```javascript
  var app = require('derby').createApp('myapp', __filename)
  app.use(require('d-bootstrap'))
  ```
  ...or just a few of them.

  ```javascript
  app.component(require('d-bootstrap/modal'))
  app.component(require('d-bootstrap/dropdown'))
  ```

3. Include the bootstrap css in your app.

  ```javascript
  var css = require('path').resolve('node_modules/bootstrap/dist/css/bootstrap')
  app.loadStyles(css) // absolute path to css without file extension
  ```

  This package does not contain any of the Bootstrap styles or fonts
  which must be included separately. Using the official `bootstrap`
  tarball is recommended, as this will allow npm to verify this
  package's `peerDependencies` support the desired bootstrap css.

  ```
  npm i --save https://github.com/twbs/bootstrap/archive/v3.0.3.tar.gz
  ```

4. Ensure the bootstrap assets are being served. In development, for example:

  ```javascript
  var assets = require('path').resolve('node_modules/bootstrap/dist')
  require('derby-starter').run(app, {static: assets})
  ```

## MIT License
Copyright (c) 2011-2014 by Nate Smith and Alexander Wenzowski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
