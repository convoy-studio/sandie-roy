var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var FooterTest;
  FooterTest = (function(_super) {
    __extends(FooterTest, _super);

    function FooterTest(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.init = __bind(this.init, this);
      FooterTest.__super__.constructor.call(this, id, scope);
    }

    FooterTest.prototype.init = function() {};

    FooterTest.prototype.destroy = function() {
      return FooterTest.__super__.destroy.call(this);
    };

    return FooterTest;

  })(View);
  return FooterTest;
});
