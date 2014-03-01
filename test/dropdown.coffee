component = require('../examples/dropdown/')
app       = require('derby-starter/lib/server').setup(component, {})
server    = require('http').createServer(app)
port      = process.env.PORT || 2668
Browser   = require('zombie')
assert    = require('assert')

describe 'dropdown component', ->
  before (done) ->
    server.listen port, (err) ->
      throw err if err
      done()

  context 'when an option is not selected', ->
    before (done) ->
      @browser = new Browser()
      @browser.visit("http://localhost:#{port}").then(done, done)

    describe 'the button label', ->
      it 'should be the default', ->
        assert.equal(@browser.location.pathname, "/")
      it 'should be customizable'

  context 'when an option is selected', ->
    describe 'the button label', ->
      it 'is inherited from selected option'

  context 'when the page is loaded', ->
    describe 'the dropdown menu', ->
      it 'is hidden'

  context 'when the button is clicked', ->
    describe 'the dropdown menu', ->
      it 'is shown'

    context 'and then clicked again', ->
      describe 'the dropdown menu', ->
        it 'is hidden'

    context 'and then the document is clicked', ->
      describe 'the dropdown menu', ->
        it 'is hidden'

    context 'and then an option is clicked', ->
      describe 'the dropdown menu', ->
        it 'is hidden'

      describe 'the button label', ->
        it 'is inherited from selected option'

  after ->
    server.close()

