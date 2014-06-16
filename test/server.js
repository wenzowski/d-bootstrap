var path = require('path')
require('derby-starter').run(require('./app'), {
  static: [
    {route: '/', dir: path.resolve('./node_modules/derby-starter/public')},
    {route: '/fonts', dir: path.resolve('./node_modules/bootstrap/dist/fonts')},

    // needed for mocha
    {route: '/node_modules', dir: path.resolve('./node_modules')},
    {route: '/test', dir: path.resolve('./test')}
  ]
})

