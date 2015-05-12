var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page", "SplitText"], function(Page, SplitText) {
  "use strict";
  var Home;
  Home = (function(_super) {
    __extends(Home, _super);

    function Home(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.transitionOutCompleted = __bind(this.transitionOutCompleted, this);
      this.transitionInCompleted = __bind(this.transitionInCompleted, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      scope.blank = Loader.getImageURL("blank");
      scope.imgA = Loader.getImageURL(id + "-imageA");
      Home.__super__.constructor.call(this, id, scope);
    }

    Home.prototype.init = function(cb) {
      return Home.__super__.init.call(this, cb);
    };

    Home.prototype.ready = function() {
      Home.__super__.ready.call(this);
    };

    Home.prototype.addAnimations = function() {
      Home.__super__.addAnimations.call(this);
    };

    Home.prototype.transitionIn = function() {
      Home.__super__.transitionIn.call(this);
    };

    Home.prototype.transitionOut = function() {
      Home.__super__.transitionOut.call(this);
    };

    Home.prototype.transitionInCompleted = function() {
      Home.__super__.transitionInCompleted.call(this);
    };

    Home.prototype.transitionOutCompleted = function() {
      Home.__super__.transitionOutCompleted.call(this);
    };

    Home.prototype.resize = function() {
      Home.__super__.resize.call(this);
    };

    Home.prototype.destroy = function() {
      Home.__super__.destroy.call(this);
    };

    return Home;

  })(Page);
  return Home;
});
