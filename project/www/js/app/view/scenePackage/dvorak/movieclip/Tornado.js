var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Movieclip"], function(Movieclip) {
  var Tornado;
  Tornado = (function(_super) {
    __extends(Tornado, _super);

    function Tornado() {
      this.onUpdate = __bind(this.onUpdate, this);
      this.init = __bind(this.init, this);
      Tornado.__super__.constructor.call(this);
    }

    Tornado.prototype.init = function() {
      return Tornado.__super__.init.call(this);
    };

    Tornado.prototype.onUpdate = function() {};

    return Tornado;

  })(Movieclip);
  return Tornado;
});
