var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["PartsPage"], function(PartsPage) {
  "use strict";
  var Production;
  Production = (function(_super) {
    __extends(Production, _super);

    function Production(id, scope) {
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
      Production.__super__.constructor.call(this, id, scope);
    }

    Production.prototype.init = function(cb) {
      return Production.__super__.init.call(this, cb);
    };

    Production.prototype.ready = function() {
      Production.__super__.ready.call(this);
    };

    Production.prototype.addAnimations = function() {
      Production.__super__.addAnimations.call(this);
    };

    Production.prototype.transitionIn = function() {
      Production.__super__.transitionIn.call(this);
    };

    Production.prototype.transitionOut = function() {
      Production.__super__.transitionOut.call(this);
    };

    Production.prototype.transitionInCompleted = function() {
      Production.__super__.transitionInCompleted.call(this);
    };

    Production.prototype.transitionOutCompleted = function() {
      Production.__super__.transitionOutCompleted.call(this);
    };

    Production.prototype.resize = function() {
      Production.__super__.resize.call(this);
    };

    Production.prototype.destroy = function() {
      Production.__super__.destroy.call(this);
    };

    return Production;

  })(PartsPage);
  return Production;
});
