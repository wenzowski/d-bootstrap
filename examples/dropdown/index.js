var app = module.exports = require('derby').createApp('components', __filename)
app.use(require('../../'))
app.loadViews(__dirname)

app.get('/', function (page, model, params, next) {
  var dropdown = model.scope('_dropdown')
  dropdown.set('class', 'btn-group')
  page.render()
})

