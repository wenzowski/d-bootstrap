module.exports = Dropdown;
function Dropdown() {}
Dropdown.prototype.view = __dirname;

Dropdown.prototype.create = function(model, dom) {
  // Close on click outside of the dropdown
  var dropdown = this;
  dom.on('click', function(e) {
    if (dropdown.toggleButton.contains(e.target)) return;
    if (dropdown.menu.contains(e.target)) return;
    model.set('open', false);
  });
};

Dropdown.prototype.toggle = function() {
  this.model.set('open', !this.model.get('open'));
};

Dropdown.prototype.select = function(option) {
  this.model.set('value', optionValue(option));
  this.model.set('open', false);
};

Dropdown.prototype.label = function(value) {
  var options = (this.model.get('options') || []);
  var keys = Object.keys(options);
  for (var i = keys.length; i--;) {
    var o = (options[keys[i]] || {});
    if (value === o.value) return o.content.template.content[0].data;
  }
  return this.model.get('prompt') || 'Select';
};

function optionValue(option) {
  return (option.hasOwnProperty('value')) ? option.value : option.content;
}
