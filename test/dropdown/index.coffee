server    = require('derby-starter/lib/server')
port      = process.env.PORT || 2668
Browser   = require('zombie')
component = require('derby').createApp('dropdown', __filename)
component.use(require('../../dropdown'))
component.loadViews(__dirname)

describe 'dropdown component', ->
  before ->
    @app = server.setup(component, {})
    @app.listen(port)

  beforeEach ->
    @browser = new Browser()

  context 'when an option is not selected', ->
    describe 'the button label', ->
      it 'should be the default'
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
    @app.close



