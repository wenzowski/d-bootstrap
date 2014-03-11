var app = module.exports = require('derby-starter/node_modules/derby').createApp('bootstrap', __filename)

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
