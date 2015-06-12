var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var Slideshow;
  Slideshow = (function(_super) {
    __extends(Slideshow, _super);

    Slideshow.prototype.isOpened = false;

    function Slideshow(id, scope) {
      this.onResize = __bind(this.onResize, this);
      this.getMousePosByClickEvent = __bind(this.getMousePosByClickEvent, this);
      this.onCloseClicked = __bind(this.onCloseClicked, this);
      this.onReverseComplete = __bind(this.onReverseComplete, this);
      this.onComplete = __bind(this.onComplete, this);
      this.tweenItemToIndex = __bind(this.tweenItemToIndex, this);
      this.decrease = __bind(this.decrease, this);
      this.increase = __bind(this.increase, this);
      this.onClicked = __bind(this.onClicked, this);
      this.updateImgSources = __bind(this.updateImgSources, this);
      this.close = __bind(this.close, this);
      this.open = __bind(this.open, this);
      this.toggle = __bind(this.toggle, this);
      this.getSlideshowRawHTML = __bind(this.getSlideshowRawHTML, this);
      this.onSlideshowOpen = __bind(this.onSlideshowOpen, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      scope = scope || {};
      scope.logo = Loader.getSvg("logo");
      scope.closeIcon = Loader.getSvg("close");
      Slideshow.__super__.constructor.call(this, id, scope);
    }

    Slideshow.prototype.init = function() {
      TweenMax.delayedCall(0.1, this.ready);
      this.itemBaseSize = {
        w: Model.personBaseSize.w * 2,
        h: Model.personBaseSize.h * 2
      };
      this.mobile = Model.mobile;
    };

    Slideshow.prototype.ready = function() {
      var $back, $closeBtn, $logo;
      this.middleContainer = this.element.find(".middle-container");
      $back = this.element.find(".back");
      $logo = this.element.find(".logo");
      $closeBtn = this.element.find(".close-btn");
      this.toCloseEl = $closeBtn;
      this.tl = new TimelineMax({
        onComplete: this.onComplete,
        onReverseComplete: this.onReverseComplete
      });
      this.tl.from($back, 1, {
        opacity: 0,
        ease: Expo.easeInOut
      }, 0);
      this.tl.from(this.middleContainer, 1, {
        opacity: 0,
        force3D: true,
        transformOrigin: "50% 50%",
        ease: Expo.easeInOut
      }, 0.2);
      this.tl.from($logo, 1, {
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.4);
      this.tl.from($closeBtn, 1, {
        scale: 1.2,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.4);
      this.tl.pause(0);
      $(window).on("resize", this.onResize);
      this.element.css({
        "display": "none"
      });
      Signal.slideshowOpen.add(this.onSlideshowOpen);
    };

    Slideshow.prototype.onSlideshowOpen = function(index, items, folderUrl) {
      var $el, $items, i, item, _i, _len;
      this.folderUrl = folderUrl;
      this.currentIndex = index;
      this.items = items;
      $el = $(this.getSlideshowRawHTML());
      this.middleContainer.html($el);
      $items = this.middleContainer.find(".item-wrapper");
      for (i = _i = 0, _len = $items.length; _i < _len; i = ++_i) {
        item = $items[i];
        this.items[i].el = item;
      }
      this.open();
    };

    Slideshow.prototype.getSlideshowRawHTML = function() {
      var html, item, _i, _len, _ref;
      html = '';
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        html += '\
                    <div class="item-wrapper btn">\
                        <img lazy-src="' + this.folderUrl + item.id + ".jpg" + '" src="' + Model.blankImg + '">\
                        <div class="down-text">' + item.text + '</div>\
                    </div>\
                ';
      }
      return html;
    };

    Slideshow.prototype.toggle = function() {
      if (this.isOpened) {
        this.close();
      } else {
        this.open();
      }
    };

    Slideshow.prototype.open = function() {
      this.isOpened = true;
      this.element.css({
        display: "block",
        opacity: 1
      });
      this.onResize();
      this.tl.timeScale(1.2).play();
      this.tweenItemToIndex(true);
      this.element.on("click", this.onClicked);
    };

    Slideshow.prototype.close = function() {
      this.isOpened = false;
      this.toCloseEl.off("click", this.onCloseClicked);
      this.tl.timeScale(1.6).reverse();
      this.element.off("click", this.onClicked);
    };

    Slideshow.prototype.updateImgSources = function() {
      var currentItem, nextItem, previousItem;
      currentItem = this.items[this.currentIndex];
      previousItem = this.items[this.currentIndex - 1];
      nextItem = this.items[this.currentIndex + 1];
      Util.SwitchImgLazySrcs(currentItem.el);
      Util.SwitchImgLazySrcs(previousItem != null ? previousItem.el : void 0);
      Util.SwitchImgLazySrcs(nextItem != null ? nextItem.el : void 0);
    };

    Slideshow.prototype.onClicked = function(e) {
      var mouse;
      if (TweenMax.isTweening(this.middleContainer)) {
        return;
      }
      mouse = this.getMousePosByClickEvent(e);
      if (mouse.x > (Model.windowW >> 1)) {
        this.increase();
      } else {
        this.decrease();
      }
      this.tweenItemToIndex();
    };

    Slideshow.prototype.increase = function() {
      this.currentIndex += 1;
      if (this.currentIndex > this.items.length - 1) {
        this.currentIndex = 0;
      }
    };

    Slideshow.prototype.decrease = function() {
      this.currentIndex -= 1;
      if (this.currentIndex < 0) {
        this.currentIndex = this.items.length - 1;
      }
    };

    Slideshow.prototype.tweenItemToIndex = function(force) {
      var item, time;
      item = this.items[this.currentIndex];
      time = force ? 0 : 0.7;
      this.tween = TweenMax.to(this.middleContainer, time, {
        x: item.centerPosX,
        force3D: true,
        ease: Expo.easeInOut
      });
      this.updateImgSources();
    };

    Slideshow.prototype.onComplete = function() {
      this.toCloseEl.on("click", this.onCloseClicked);
    };

    Slideshow.prototype.onReverseComplete = function() {
      this.element.css({
        display: "none",
        opacity: 0
      });
    };

    Slideshow.prototype.onCloseClicked = function() {
      this.close();
    };

    Slideshow.prototype.getMousePosByClickEvent = function(e) {
      var x, y;
      if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
      } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      return {
        x: x,
        y: y
      };
    };

    Slideshow.prototype.onResize = function() {
      var i, item, itemCss, itemH, itemRemainW, itemW, mContainerCss, paddingBetween, scale, _i, _len, _ref;
      scale = (Model.windowW / 1360) * 1;
      scale = Util.Limit(0.5, 1.4, scale);
      itemW = this.itemBaseSize.w * scale;
      itemH = this.itemBaseSize.h * scale;
      itemRemainW = Model.windowW - itemW;
      paddingBetween = (itemRemainW >> 1) - (itemW * 0.1);
      if (this.items != null) {
        _ref = this.items;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          item = _ref[i];
          itemCss = {
            width: itemW,
            height: itemH,
            left: (itemW * i) + (paddingBetween * i)
          };
          item.centerPosX = (Model.windowW >> 1) - (itemCss.left + (itemW >> 1));
          TweenMax.set(item.el, itemCss);
        }
        mContainerCss = {
          top: (Model.windowH >> 1) - (itemH >> 1)
        };
        this.middleContainer.css(mContainerCss);
        this.tweenItemToIndex(true);
      }
    };

    return Slideshow;

  })(View);
  return Slideshow;
});
