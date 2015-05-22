var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["PartsPage"], function(PartsPage) {
  "use strict";
  var About;
  About = (function(_super) {
    __extends(About, _super);

    function About(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.transitionOutCompleted = __bind(this.transitionOutCompleted, this);
      this.transitionInCompleted = __bind(this.transitionInCompleted, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      scope.pathId = id;
      scope.imagePath = "image/page/" + scope.pathId + "/";
      About.__super__.constructor.call(this, id, scope);
    }

    About.prototype.init = function(cb) {
      return About.__super__.init.call(this, cb);
    };

    About.prototype.ready = function() {
      About.__super__.ready.call(this);
    };

    About.prototype.addAnimations = function() {
      About.__super__.addAnimations.call(this);
    };

    About.prototype.transitionIn = function() {
      About.__super__.transitionIn.call(this);
    };

    About.prototype.transitionOut = function() {
      About.__super__.transitionOut.call(this);
    };

    About.prototype.transitionInCompleted = function() {
      About.__super__.transitionInCompleted.call(this);
    };

    About.prototype.transitionOutCompleted = function() {
      About.__super__.transitionOutCompleted.call(this);
    };

    About.prototype.resize = function() {
      About.__super__.resize.call(this);
    };

    About.prototype.destroy = function() {
      About.__super__.destroy.call(this);
    };

    return About;

  })(PartsPage);
  return About;
});
