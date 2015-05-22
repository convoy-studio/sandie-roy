var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var TimelineMenu;
  TimelineMenu = (function(_super) {
    __extends(TimelineMenu, _super);

    TimelineMenu.prototype.previews = void 0;

    TimelineMenu.prototype.slideDelay = 4;

    TimelineMenu.prototype.currentSlide = -1;

    TimelineMenu.prototype.firstLoad = true;

    function TimelineMenu(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.onResize = __bind(this.onResize, this);
      this.onClick = __bind(this.onClick, this);
      this.onLeave = __bind(this.onLeave, this);
      this.onEnter = __bind(this.onEnter, this);
      this.changeSlide = __bind(this.changeSlide, this);
      this.getRect = __bind(this.getRect, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      scope = {};
      scope.previews = Model.routing.slice(0, Model.routing.length - 1);
      TimelineMenu.__super__.constructor.call(this, id, scope);
    }

    TimelineMenu.prototype.init = function() {
      TweenMax.delayedCall(0.1, this.ready);
    };

    TimelineMenu.prototype.ready = function() {
      var $item, $titleTop, i, item, o, titleH, titleW, _i, _len, _ref;
      this.li = this.element.find("li");
      this.li.on("mouseenter", this.onEnter);
      this.li.on("mouseleave", this.onLeave);
      this.li.on("click", this.onClick);
      this.titlesLinesTop = $("#timeline-menu-view .menu-title, #timeline-menu-view .line");
      this.slideTitles = $(".pages-preview-container .title");
      this.items = [];
      _ref = this.previews;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        o = {};
        o.preview = this.previews[i];
        $item = $(item);
        $titleTop = $item.find(".title-top");
        titleW = $titleTop.width();
        titleH = $titleTop.height();
        o.color = o.preview.el.getAttribute("color");
        o.liEl = item;
        o.titleW = $titleTop.width();
        o.titleH = $titleTop.height();
        this.items[i] = o;
      }
      this.addAnimations();
      this.changeSlide();
    };

    TimelineMenu.prototype.addAnimations = function() {
      var elInTween, elOutTween, i, item, tl, _i, _len, _ref;
      _ref = this.items;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        tl = new TimelineMax();
        item.tl = tl;
        elInTween = TweenMax.from(item.preview.el, 1.4, {
          x: Model.windowW,
          opacity: 0,
          transformOrigin: "0% 0%",
          force3D: true,
          ease: Power3.easeInOut
        });
        elOutTween = TweenMax.to(item.preview.el, 1.4, {
          x: -Model.windowW,
          opacity: 0,
          transformOrigin: "0% 100%",
          force3D: true,
          ease: Power3.easeInOut
        });
        item.elInTween = elInTween;
        item.elOutTween = elOutTween;
        tl.add("transition-in");
        tl.add(elInTween, 0);
        tl.add("transition-out");
        tl.add(elOutTween, "transition-out");
        tl.add("transition-finished");
        tl.pause(0);
      }
    };

    TimelineMenu.prototype.getRect = function(top, right, bottom, left) {
      return "rect(" + top + "px " + right + "px " + bottom + "px " + left + "px" + ")";
    };

    TimelineMenu.prototype.changeSlide = function() {
      var next, previous;
      this.currentSlide += 1;
      if (this.currentSlide > this.items.length - 1) {
        this.currentSlide = 0;
      }
      if (this.currentSlide < 0) {
        this.currentSlide = this.items.length - 1;
      }
      previous = this.items[this.currentSlide - 1];
      next = this.items[this.currentSlide];
      if (previous == null) {
        previous = this.items[this.items.length - 1];
      }
      previous.preview.el.style.zIndex = 4;
      next.preview.el.style.zIndex = 5;
      if (this.firstLoad) {
        previous.tl.pause("transition-finished");
        next.tl.pause("transition-out");
        TweenMax.delayedCall(this.slideDelay * 0.5, this.changeSlide);
      } else {
        if (previous != null) {
          previous.tl.tweenFromTo("transition-out", "transition-finished");
        }
        next.tl.tweenFromTo("transition-in", "transition-out");
        TweenMax.delayedCall(this.slideDelay, this.changeSlide);
      }
      this.firstLoad = false;
    };

    TimelineMenu.prototype.onEnter = function(e) {
      var $target, id;
      e.preventDefault();
      $target = $(e.currentTarget);
      id = $target.attr("id");
    };

    TimelineMenu.prototype.onLeave = function(e) {
      var $target, id;
      e.preventDefault();
      $target = $(e.currentTarget);
      id = $target.attr("id");
    };

    TimelineMenu.prototype.onClick = function(e) {
      var $target, id;
      e.preventDefault();
      $target = $(e.currentTarget);
      id = $target.attr("id");
      Router.sendTo(id);
    };

    TimelineMenu.prototype.onResize = function() {
      var elementCss;
      elementCss = {
        left: (Model.windowW >> 1) - (this.element.width() >> 1),
        top: Model.windowH - this.element.height() - 40
      };
      this.element.css(elementCss);
    };

    TimelineMenu.prototype.destroy = function() {
      var i, item, _i, _len, _ref;
      TweenMax.killDelayedCallsTo(this.changeSlide);
      _ref = this.items;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        item.tl.clear();
      }
      this.li.off("mouseenter", this.onEnter);
      this.li.off("mouseleave", this.onLeave);
      this.li.off("click", this.onClick);
      TimelineMenu.__super__.destroy.call(this);
    };

    return TimelineMenu;

  })(View);
  return TimelineMenu;
});
