module.exports = Collapse;
function Collapse() {}
Collapse.prototype.view = __dirname;

Collapse.TRANSITION_DURATION = 350;

Collapse.prototype.init = function () {
  this.model.set('class', 'collapse');
}

Collapse.prototype.toggle = function () {
  if (this.timeoutId) return false;
  if (this.shown === true) return this.hide();
  this.show();
};

Collapse.prototype.show = function () {
  this.shown = true;
  this.model.set('class', 'collapsing in');
  this.model.set('style', 'height: ' + this.div.scrollHeight + 'px;');
  this.timeout(this.onShow.bind(this));
}

Collapse.prototype.onShow = function () {
  this.model.set('class', 'collapse in');
}

Collapse.prototype.hide = function () {
  delete this.shown;
  this.model.set('class', 'collapsing');
  this.model.set('style', 'height: 1px;');
  this.timeout(this.onHide.bind(this));
}

Collapse.prototype.onHide = function () {
  this.model.set('class', 'collapse');
}

Collapse.prototype.timeout = function (func) {
  this.timeoutId = setTimeout(this.onTimeout.bind(this, func), Collapse.TRANSITION_DURATION)
}

Collapse.prototype.onTimeout = function (func) {
  func();
  delete this.timeoutId;
}
