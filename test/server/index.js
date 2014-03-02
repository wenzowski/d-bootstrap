var app = module.exports = require('derby').createApp('components', __filename)
app.use(require('../../'))
app.loadViews(__dirname + '/views')

app.get('/dropdown', function (page, model, params, next) {
  var dropdown  = model.scope('_dropdown')
    , options   = dropdown.at('options')
  options.push({class: 'red', content: 'Me'})
  options.push({class: 'green', content: 'and'})
  options.push({class: 'blue', content: 'You'})
  page.render('dropdownComponent')
})

