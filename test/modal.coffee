Browser    = require('zombie')
assert     = require('assert')

{location} = require('./runserver')
location   = "#{location}/modal"

describe 'modal component', ->
  before (done) ->
    ready = (window) ->
      window.document.readyState is 'complete'
    @browser = new Browser()
    @browser.visit(location)
    @browser.wait(ready, done)

  context 'when the page is loaded', ->
    describe 'the modal', ->
      it 'should be hidden', ->
        assert.equal @browser.html('div.modal.fade.in'), ''

  context 'when the show modal button is clicked', ->
    before (done) ->
      @browser.pressButton("Show modal")
      @browser.wait(0.01, done) # should probably listen for event instead

    describe 'the modal', ->
      it 'should be visible', ->
        assert.notEqual @browser.text('div.modal.fade.in'), ''

