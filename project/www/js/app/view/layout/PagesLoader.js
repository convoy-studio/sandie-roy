var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var PagesLoader;
  PagesLoader = (function(_super) {
    __extends(PagesLoader, _super);

    PagesLoader.prototype.isLoading = false;

    function PagesLoader(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.init = __bind(this.init, this);
      PagesLoader.__super__.constructor.call(this, id, scope);
    }

    PagesLoader.prototype.init = function() {
      this.element.css("display", "none");
      this.tl = new TimelineMax();
      this.tl.from(this.element, 1, {
        opacity: 0,
        ease: Expo.easeInOut
      }, 0);
      this.tl.pause(0);
      return this.resize();
    };

    PagesLoader.prototype.show = function(cb) {
      var _this = this;
      if (this.isLoading) {
        return;
      }
      this.tl.timeScale(1.4);
      this.tl.play(0);
      this.tl.eventCallback("onComplete", function() {
        cb();
        _this.tl.eventCallback("onComplete", null);
      });
      this.element.css("display", "block");
      $(window).on("resize", this.resize);
      return this.isLoading = true;
    };

    PagesLoader.prototype.hide = function(cb) {
      var _this = this;
      this.tl.timeScale(3);
      this.tl.reverse();
      this.tl.eventCallback("onReverseComplete", function() {
        _this.element.css("display", "none");
        _this.tl.eventCallback("onReverseComplete", null);
        cb();
        return _this.isLoading = false;
      });
      return this.element.css("display", "block");
    };

    PagesLoader.prototype.resize = function() {
      return this.onde.resize();
    };

    PagesLoader.prototype.destroy = function() {
      return PagesLoader.__super__.destroy.call(this);
    };

    return PagesLoader;

  })(View);
  return PagesLoader;
});
