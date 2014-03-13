var app = module.exports = require('derby').createApp('bootstrap', __filename)

app.use(require('../../'))
app.loadViews(__dirname)

app.get('/', function (page) {
  page.render()
})

app.get('/mocha', function (page) {
  page.render('mocha')
})

app.on('model', function (model) {
  if (global.window) window.model = model
})

app.on('ready', function () {
  window.app = app
})

