module.exports = function (watch) {
  var app = require('derby').createApp('bootstrap', __filename)

  if (watch) watch(app)

  app.use(require('../../'))
  app.loadViews(__dirname)

  app.get('/', function (page) {
    page.render()
  })

  app.get('/mocha', function (page) {
    page.render('mocha')
  })

  app.on('ready', function (model) {
    window.app = app
    window.model = model
  })

  return app
}

