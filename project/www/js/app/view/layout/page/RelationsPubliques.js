var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page"], function(Page) {
  var RelationsPubliques;
  RelationsPubliques = (function(_super) {
    __extends(RelationsPubliques, _super);

    function RelationsPubliques(id, scope) {
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
      RelationsPubliques.__super__.constructor.call(this, id, scope);
    }

    RelationsPubliques.prototype.init = function(cb) {
      return RelationsPubliques.__super__.init.call(this, cb);
    };

    RelationsPubliques.prototype.ready = function() {
      RelationsPubliques.__super__.ready.call(this);
    };

    RelationsPubliques.prototype.addAnimations = function() {
      RelationsPubliques.__super__.addAnimations.call(this);
    };

    RelationsPubliques.prototype.transitionIn = function() {
      RelationsPubliques.__super__.transitionIn.call(this);
    };

    RelationsPubliques.prototype.transitionOut = function() {
      RelationsPubliques.__super__.transitionOut.call(this);
    };

    RelationsPubliques.prototype.transitionInCompleted = function() {
      RelationsPubliques.__super__.transitionInCompleted.call(this);
    };

    RelationsPubliques.prototype.transitionOutCompleted = function() {
      RelationsPubliques.__super__.transitionOutCompleted.call(this);
    };

    RelationsPubliques.prototype.resize = function() {
      RelationsPubliques.__super__.resize.call(this);
    };

    RelationsPubliques.prototype.destroy = function() {
      RelationsPubliques.__super__.destroy.call(this);
    };

    return RelationsPubliques;

  })(Page);
  return RelationsPubliques;
});
