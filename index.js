module.exports = function(app, options) {
  app.component(require('./affix'));
  app.component(require('./dropdown'));
  app.component(require('./modal'));
  app.component(require('./tabs'));
};
