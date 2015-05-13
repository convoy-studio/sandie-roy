var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var name;
  name = (function(_super) {
    __extends(name, _super);

    function name(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.init = __bind(this.init, this);
      name.__super__.constructor.call(this, id, scope);
    }

    name.prototype.init = function() {};

    name.prototype.destroy = function() {
      return name.__super__.destroy.call(this);
    };

    return name;

  })(View);
  return name;
});
