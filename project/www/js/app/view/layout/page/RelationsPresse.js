var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page"], function(Page) {
  "use strict";
  var RelationsPresse;
  RelationsPresse = (function(_super) {
    __extends(RelationsPresse, _super);

    function RelationsPresse(id, scope) {
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
      RelationsPresse.__super__.constructor.call(this, id, scope);
    }

    RelationsPresse.prototype.init = function(cb) {
      return RelationsPresse.__super__.init.call(this, cb);
    };

    RelationsPresse.prototype.ready = function() {
      RelationsPresse.__super__.ready.call(this);
    };

    RelationsPresse.prototype.addAnimations = function() {
      RelationsPresse.__super__.addAnimations.call(this);
    };

    RelationsPresse.prototype.transitionIn = function() {
      RelationsPresse.__super__.transitionIn.call(this);
    };

    RelationsPresse.prototype.transitionOut = function() {
      RelationsPresse.__super__.transitionOut.call(this);
    };

    RelationsPresse.prototype.transitionInCompleted = function() {
      RelationsPresse.__super__.transitionInCompleted.call(this);
    };

    RelationsPresse.prototype.transitionOutCompleted = function() {
      RelationsPresse.__super__.transitionOutCompleted.call(this);
    };

    RelationsPresse.prototype.resize = function() {
      RelationsPresse.__super__.resize.call(this);
    };

    RelationsPresse.prototype.destroy = function() {
      RelationsPresse.__super__.destroy.call(this);
    };

    return RelationsPresse;

  })(Page);
  return RelationsPresse;
});
