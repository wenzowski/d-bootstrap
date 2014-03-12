var app = module.exports = require('derby').createApp('bootstrap', __filename)

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

