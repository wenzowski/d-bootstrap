module.exports = Modal;
function Modal() {}
Modal.prototype.view = __dirname;

Modal.prototype.create = function(model, dom) {
  var modal = this;
  dom.on('keydown', function(e) {
    if (!model.get('show')) return;
    if (e.keyCode === 27) {  // Escape
      modal.hide('escape');
    }
  });
};

Modal.prototype.show = function(done) {
  var model = this.model;
  this.emitDelayable('show', function() {
    model.set('show', true);
    setTimeout(function() {
      model.set('faded', true);
      if (done) done();
    }, 0);
  });
};

Modal.prototype.hide = function(action, done) {
  var cancelled = this.emitCancellable('hide', action);
  if (cancelled) return;
  var model = this.model;
  model.set('faded', false);
  setTimeout(function() {
    model.set('show', false);
    if (done) done();
  }, 300);
};
