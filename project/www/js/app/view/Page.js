var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View", "signals"], function(View, signals) {
  "use strict";
  var Page;
  Page = (function(_super) {
    __extends(Page, _super);

    Page.prototype.transitionInComplete = void 0;

    Page.prototype.transitionOutComplete = void 0;

    Page.prototype.tl = void 0;

    Page.prototype.initCb = void 0;

    function Page(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.transitionOutCompleted = __bind(this.transitionOutCompleted, this);
      this.transitionInCompleted = __bind(this.transitionInCompleted, this);
      this.continueToTransitionOut = __bind(this.continueToTransitionOut, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      Page.__super__.constructor.call(this, id, scope);
    }

    Page.prototype.init = function(cb) {
      this.initCb = cb;
      Signal.onResize.add(this.resize);
      this.tl = new TimelineMax({
        onComplete: this.transitionInCompleted,
        onReverseComplete: this.transitionOutCompleted
      });
      this.transitionInComplete = new signals.Signal();
      this.transitionOutComplete = new signals.Signal();
      TweenMax.delayedCall(0, this.ready);
    };

    Page.prototype.ready = function() {
      this.initCb();
    };

    Page.prototype.addAnimations = function() {
      this.tl.fromTo(this.element, 1, {
        opacity: 0
      }, {
        opacity: 1
      }, 0);
      this.tl.pause(0);
    };

    Page.prototype.transitionIn = function() {
      this.tl.timeScale(1.2);
      this.tl.tweenTo(this.tl.duration());
    };

    Page.prototype.transitionOut = function() {
      this.continueToTransitionOut();
    };

    Page.prototype.continueToTransitionOut = function() {
      this.tl.timeScale(1.6);
      this.tl.tweenTo(0);
    };

    Page.prototype.transitionInCompleted = function() {
      this.transitionInComplete.dispatch();
    };

    Page.prototype.transitionOutCompleted = function() {
      this.transitionOutComplete.dispatch();
    };

    Page.prototype.resize = function() {
      var elementCss;
      elementCss = {
        y: Model.windowH,
        force3D: true
      };
      TweenMax.set(this.element, elementCss);
    };

    Page.prototype.destroy = function() {
      Page.__super__.destroy.call(this);
      Signal.onResize.remove(this.resize);
      this.transitionInComplete.removeAll();
      this.transitionOutComplete.removeAll();
      this.transitionInComplete = null;
      this.transitionOutComplete = null;
      this.tl.clear();
      this.tl = null;
    };

    return Page;

  })(View);
  return Page;
});
