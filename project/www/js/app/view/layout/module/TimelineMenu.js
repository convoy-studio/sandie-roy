var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var TimelineMenu;
  TimelineMenu = (function(_super) {
    __extends(TimelineMenu, _super);

    TimelineMenu.prototype.previews = void 0;

    TimelineMenu.prototype.slideDelay = 6;

    TimelineMenu.prototype.currentSlide = -1;

    function TimelineMenu(id, scope) {
      this.onResize = __bind(this.onResize, this);
      this.onClick = __bind(this.onClick, this);
      this.onLeave = __bind(this.onLeave, this);
      this.onEnter = __bind(this.onEnter, this);
      this.onHomePage = __bind(this.onHomePage, this);
      this.onPartPageTransitionOut = __bind(this.onPartPageTransitionOut, this);
      this.onPartPageTransitionIn = __bind(this.onPartPageTransitionIn, this);
      this.changeSlide = __bind(this.changeSlide, this);
      this.getRect = __bind(this.getRect, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.init = __bind(this.init, this);
      scope = {};
      scope.previews = Model.routing;
      TimelineMenu.__super__.constructor.call(this, id, scope);
    }

    TimelineMenu.prototype.init = function() {
      var $item, $li, $lines, $menuTitles, $titleTop, i, item, o, titleH, titleW, _i, _len;
      Signal.onPartPageTransitionIn.add(this.onPartPageTransitionIn);
      Signal.onPartPageTransitionOut.add(this.onPartPageTransitionOut);
      Signal.onHomePage.add(this.onHomePage);
      $li = this.element.find("li");
      $li.on("mouseenter", this.onEnter);
      $li.on("mouseleave", this.onLeave);
      $li.on("click", this.onClick);
      this.items = [];
      for (i = _i = 0, _len = $li.length; _i < _len; i = ++_i) {
        item = $li[i];
        o = {};
        o.preview = this.previews[i];
        $item = $(item);
        $titleTop = $item.find(".title-top");
        $menuTitles = $item.find(".menu-title");
        $lines = $item.find(".line");
        titleW = $titleTop.width();
        titleH = $titleTop.height();
        o.liEl = item;
        o.titleW = $titleTop.width();
        o.titleH = $titleTop.height();
        o.titlesHolder = $item.find(".menu-titles-holder");
        o.titles = $menuTitles;
        o.lines = $lines;
        o.titlesHolder.css({
          width: titleW,
          height: titleH
        });
        $menuTitles.css({
          position: "absolute"
        });
        this.items[i] = o;
      }
      console.log(this.items);
      this.addAnimations();
      this.changeSlide();
    };

    TimelineMenu.prototype.addAnimations = function() {
      var i, item, tl, _i, _len, _ref;
      _ref = this.items;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        tl = new TimelineMax();
        item.tl = tl;
        tl.add("transition-in");
        tl.from(item.preview.el, 1, {
          x: Model.windowW,
          scaleX: 0,
          transformOrigin: "0% 0%",
          force3D: true,
          ease: Expo.easeInOut
        }, 0);
        tl.from(item.lines[0], this.slideDelay, {
          scaleX: 0,
          transformOrigin: "0% 0%",
          force3D: true,
          ease: Linear.easeNone
        }, 0);
        tl.fromTo(item.titles[0], this.slideDelay, {
          clip: this.getRect(0, 0, item.titleH, 0)
        }, {
          clip: this.getRect(0, item.titleW, item.titleH, 0),
          force3D: true,
          ease: Linear.easeNone
        }, 0);
        tl.add("transition-out");
        tl.to(item.preview.el, 1, {
          scaleX: 0,
          transformOrigin: "0% 100%",
          force3D: true,
          ease: Expo.easeInOut
        }, "transition-out");
        tl.to(item.lines[0], 1, {
          scaleX: 0,
          transformOrigin: "100% 0%",
          force3D: true,
          ease: Expo.easeOut
        }, "transition-out");
        tl.to(item.titles[0], 1, {
          clip: this.getRect(0, item.titleW, item.titleH, item.titleW),
          force3D: true,
          ease: Expo.easeOut
        }, "transition-out");
        tl.add("transition-finished");
        tl.pause(0);
      }
    };

    TimelineMenu.prototype.getRect = function(top, right, bottom, left) {
      return "rect(" + top + "px " + right + "px " + bottom + "px " + left + "px" + ")";
    };

    TimelineMenu.prototype.changeSlide = function() {
      var next, previous,
        _this = this;
      this.currentSlide += 1;
      if (this.currentSlide > this.items.length - 1) {
        this.currentSlide = 0;
      }
      if (this.currentSlide < 0) {
        this.currentSlide = this.items.length - 1;
      }
      TweenMax.delayedCall(this.slideDelay, this.changeSlide);
      previous = this.items[this.currentSlide - 1];
      next = this.items[this.currentSlide];
      if (previous == null) {
        previous = this.items[this.items.length - 1];
      }
      TweenMax.delayedCall(0.1, function() {
        if (previous != null) {
          return previous.tl.tweenFromTo("transition-out", "transition-finished");
        }
      });
      next.tl.tweenFromTo("transition-in", "transition-out");
    };

    TimelineMenu.prototype.onPartPageTransitionIn = function() {
      console.log("onPartPageTransitionIn", Model.newHash);
      TweenMax.killDelayedCallsTo(this.changeSlide);
    };

    TimelineMenu.prototype.onPartPageTransitionOut = function() {
      console.log("onPartPageTransitionOut", Model.newHash);
    };

    TimelineMenu.prototype.onHomePage = function() {
      console.log("onHomePage", Model.newHash);
      this.changeSlide();
    };

    TimelineMenu.prototype.onEnter = function(e) {
      var $target, id;
      $target = $(e.currentTarget);
      id = $target.attr("id");
    };

    TimelineMenu.prototype.onLeave = function(e) {
      var $target, id;
      $target = $(e.currentTarget);
      id = $target.attr("id");
    };

    TimelineMenu.prototype.onClick = function(e) {
      var $target, id;
      $target = $(e.currentTarget);
      id = $target.attr("id");
      Router.sendTo(id);
    };

    TimelineMenu.prototype.onResize = function() {
      var elementCss, i, item, tween, _i, _len, _ref;
      _ref = this.items;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        tween = item.tl.getTweensOf(item.preview.el)[1];
        tween.vars.x = Model.windowW;
      }
      elementCss = {
        left: (Model.windowW >> 1) - (this.element.width() >> 1),
        top: Model.windowH - this.element.height() - 40
      };
      this.element.css(elementCss);
    };

    return TimelineMenu;

  })(View);
  return TimelineMenu;
});
