Browser    = require('zombie')
assert     = require('assert')

{location} = require('./runserver')
location   = "#{location}/dropdown"

describe 'dropdown component', ->
  before (done) ->
    ready = (window) ->
      window.document.readyState is 'complete'
    @browser = new Browser()
    @browser.visit(location)
    @browser.wait(ready, done)

  context 'when the page is loaded', ->
    describe 'the button label', ->
      it 'should be the default', ->
        assert.equal @browser.text('button#dropdown-toggle_1'), 'Select'
        assert.equal @browser.text('div.selected'), ''

      it 'should be customizable', ->
        assert.equal @browser.text('button#dropdown-toggle-custom'), 'Custom'

    describe 'the dropdown menu', ->
      it 'is hidden', ->
        assert.equal @browser.text('div.dropdown.open'), ''

  context 'when the button is clicked', ->
    before ->
      @browser.pressButton("Select")

    describe 'the dropdown menu', ->
      it 'is shown', ->
        assert.equal @browser.text('div.dropdown.open'), 'Select MeandYou'

    context 'when an option is clicked', ->
      before ->
        @browser.clickLink("Me")

      describe 'the dropdown menu', ->
        it 'is hidden', ->
          assert.equal @browser.text('div.dropdown.open'), ''

      describe 'the button label', ->
        it 'is inherited from selected option', ->
          assert.equal @browser.text('button#dropdown-toggle_1'), 'Me'

    context 'when the button is clicked again', ->
      describe 'the dropdown menu', ->
        it 'is hidden'

    context 'when the document is clicked', ->
      describe 'the dropdown menu', ->
        it 'is hidden'

