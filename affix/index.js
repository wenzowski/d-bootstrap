module.exports = Affix
function Affix() {}
Affix.prototype.view = __dirname

Affix.prototype.init = function () {
  this.model.setNull('offsetTop', 0)
  this.model.setNull('offsetBottom', 0)
  this.model.setNull('position', 'static')
  this.model.setNull('affixed', 'affix-top')
  this.model.setNull('top', 'auto')
}

Affix.prototype.create = function(model, dom) {
  dom.on('scroll', window, this._position.bind(this))
  dom.on('resize', window, this._position.bind(this))
  dom.on('click', this._position.bind(this))

  this._position()
}

Affix.prototype._position = function () {
  var affixed  = this._getAffixed(this._offset())
    , position = this._getPosition(affixed)
    , top      = this._topPosition(position)

  this.model.setDiff('affixed', affixed)
  this.model.setDiff('position', position)
  this.model.setDiff('top', top)
}

Affix.prototype._topPosition = function (position) {
  switch (position) {
    case 'fixed'    : return this.model.get('offsetTop') + 'px'
    case 'absolute' : return 'auto' //TODO
    default         : return 'auto'
  }
}

Affix.prototype._getPosition = function (affixed) {
  switch (affixed) {
    case 'affix'        : return 'fixed'
    case 'affix-bottom' : return 'absolute'
    default             : return 'static'
  }
}

Affix.prototype._getAffixed = function (offset) {
  switch (true) {
    case this._topTrigger(offset)    : return 'affix'
    case this._bottomTrigger(offset) : return 'affix-bottom'
    default                          : return 'affix-top'
  }
}

Affix.prototype._topTrigger = function (offset) {
  return (offset.top < 0 && offset.bottom > 0)
}

Affix.prototype._bottomTrigger = function (offset) {
  return (offset.bottom < 0)
}

Affix.prototype._offset = function () {
  return { top     : this._top()    - parseInt(this.model.get('offsetTop'))
         , bottom  : this._bottom() - parseInt(this.model.get('offsetBottom'))
         }
}

Affix.prototype._top = function () {
  return this.container.getBoundingClientRect().top
}

Affix.prototype._bottom = function () {
  return ( document.body.offsetHeight
         + this.container.offsetHeight
         - window.innerHeight
         - window.scrollY
         )
}

