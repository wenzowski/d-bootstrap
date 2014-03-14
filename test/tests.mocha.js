describe('Derby', function () {
  waitFor('app', 'model')

  describeComponent('Modal', function () {
    before(function () {
      this.element = document.getElementById('modal' + this.id)
    })

    it('is delayable')
    it('is cancellable')
    it('is closed when the escape key is clicked')
    it('is closed when an element outside the dropdown is clicked')

    context('when the page is loaded', function() {
      it('is hidden', function () {
        expect(this.model.get('show')).to.be(undefined)
      })
      it('is faded out', function () {
        expect(this.model.get('faded')).to.be(undefined)
      })
      it('is not visible', function () {
        expect(this.element.classList.contains('in')).to.be(false)
      })
      it('is not dimmed', function () {
        expect(this.element.style.getPropertyValue('display')).to.be(null)
      })
    })

    context('when it is opened', function() {
      before(function (done) {
        this.instance.show(done)
      })
      it('is shown', function () {
        expect(this.model.get('show')).to.be(true)
      })
      it('is faded in', function () {
        expect(this.model.get('faded')).to.be(true)
      })
      it('is visible', function () {
        expect(this.element.classList.contains('in')).to.be(true)
      })
      it('is dimmed', function () {
        expect(this.element.style.getPropertyValue('display')).to.be('block')
      })
    })

    context('when it is closed', function() {
      before(function (done) {
        this.instance.hide(null, done)
      })
      it('is hidden', function () {
        expect(this.model.get('show')).to.be(false)
      })
      it('is faded out', function () {
        expect(this.model.get('faded')).to.be(false)
      })
      it('is not visible', function () {
        expect(this.element.classList.contains('in')).to.be(false)
      })
      it('is not dimmed', function () {
        expect(this.element.style.getPropertyValue('display')).to.be(null)
      })
    })
  }) // end Modal

  describeComponent('Dropdown', function () {
    before(function () {
      this.button    = this.instance.toggleButton
      this.container = this.button.parentNode
      this.options   = this.instance.menu.childNodes
      this.option    = this.options[1].childNodes[0]
    })

    context('when the page is loaded', function() {
      it('is closed', function () {
        expect(this.model.get('open')).to.be(undefined)
      })
      it('hides its menu', function() {
        expect(this.container.classList.contains('open')).to.be(false)
      })
      it('does not have a default value', function () {
        expect(this.model.get('value')).to.be(undefined)
      })
      it('uses the default label', function() {
        expect(this.button.textContent.trim()).to.eql('Select')
      })
      xit('uses a custom label', function() {
        this.model.set('prompt', 'Selectorzzz')
        expect(this.instance.label()).to.eql('Selectorzzz')
        expect(this.model.get('value')).to.be(undefined)
        expect(this.button.textContent.trim()).to.eql('Selectorzzz')
      })
    })

    context('when the toggle button is clicked', function() {
      before(function () {
        this.model.set('open', false)
        emit(this.button, 'click')
      })
      it('is open', function () {
        expect(this.model.get('open')).to.be(true)
      })
      it('shows its menu', function() {
        expect(this.container.classList.contains('open')).to.be(true)
      })
    })

    context('when an option is clicked', function() {
      before(function () {
        this.model.set('open', false)
        this.model.del('value')
        emit(this.button, 'click')
        emit(this.option, 'click')
      })
      it('is closed', function () {
        expect(this.model.get('open')).to.be(false)
      })
      it('is updated', function () {
        expect(this.model.get('value')).to.be('yes')
      })
      it('uses the selected option as the label', function() {
        expect(this.button.textContent.trim()).to.eql('Yay!')
      })
    })

    context('when an element outside the dropdown is clicked', function () {
      before(function () {
        this.model.set('open', true)
      })
      it('is closed', function () {
        expect(this.model.get('open')).to.be(true)
        emit(document.getElementsByTagName('body')[0], 'click')
        expect(this.model.get('open')).to.be(false)
      })
    })
  }) // end Dropdown

  function waitFor() {
    var globals = arguments
    var i = globals.length
    while (i--) {
      var global = globals[i]
      before(function (done) {
        when(global, done)
      })
    }
    function when(global, done) {
      window[global] ? done() : setTimeout(
        when.bind(this, global, done), 1
      )
    }
    it('is ready', function () {
      var i = globals.length
      while (i--) {
        var global = globals[i]
        expect(window[global]).to.not.be(undefined)
      }
    })
  }

  function describeComponent(namedInstance, cb) {
    describe(namedInstance + ' component', function () {
      before(function () {
        this.instance = app.page[namedInstance]
        this.id       = this.instance ? this.instance._scope.slice(-1)[0] : null
        this.scope    = this.instance ? this.instance._scope.join('.')    : null
        this.model    = this.scope    ? app.model.scope(this.scope)       : null
      })
      it('knows its own id', function() {
        expect(this.model.get('id')).to.eql(this.id)
      })
      cb()
    })
  }

  function emit(el, etype){
    if (el.fireEvent) {
      (el.fireEvent('on' + etype));
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

})
