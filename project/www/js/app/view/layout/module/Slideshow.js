var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var Slideshow;
  Slideshow = (function(_super) {
    __extends(Slideshow, _super);

    function Slideshow(id, scope) {
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      Slideshow.__super__.constructor.call(this, id, scope);
    }

    Slideshow.prototype.init = function() {
      this.ready();
    };

    Slideshow.prototype.ready = function() {
      console.log("slideshow");
    };

    return Slideshow;

  })(View);
  return Slideshow;
});
