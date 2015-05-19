var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page", "signals", "MouseWheel"], function(Page, signals, wheel) {
  "use strict";
  var PartsPage;
  PartsPage = (function(_super) {
    __extends(PartsPage, _super);

    PartsPage.prototype.currentZIndex = 0;

    PartsPage.prototype.currentSection = 0;

    PartsPage.prototype.transitionRunning = false;

    function PartsPage(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.changeSection = __bind(this.changeSection, this);
      this.onMouseWheel = __bind(this.onMouseWheel, this);
      this.reArrangeIndex = __bind(this.reArrangeIndex, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      PartsPage.__super__.constructor.call(this, id, scope);
    }

    PartsPage.prototype.init = function(cb) {
      PartsPage.__super__.init.call(this, cb);
    };

    PartsPage.prototype.ready = function() {
      var i, o, part, _i, _len, _ref;
      PartsPage.__super__.ready.call(this);
      this.parts = this.element.find(".part-holder");
      this.currentZIndex = this.parts.length - 1;
      this.partsTweens = [];
      _ref = this.parts;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        part = _ref[i];
        o = {};
        o.el = part;
        o.tweenTop = void 0;
        o.tweenDown = void 0;
        o.tweenCenter = void 0;
        this.partsTweens[i] = o;
      }
    };

    PartsPage.prototype.transitionIn = function() {
      this.reArrangeIndex();
      $(window).on('mousewheel', this.onMouseWheel);
      PartsPage.__super__.transitionIn.call(this);
    };

    PartsPage.prototype.transitionOut = function() {
      $(window).off('mousewheel', this.onMouseWheel);
      PartsPage.__super__.transitionOut.call(this);
    };

    PartsPage.prototype.addAnimations = function() {
      this.tl.fromTo(this.element, 0.6, {
        opacity: 0
      }, {
        opacity: 1,
        force3D: true,
        ease: Expo.easeInOut
      }, 0);
      this.tl.fromTo(this.element, 1, {
        y: Model.windowH + 10
      }, {
        y: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.3);
      this.tl.pause(0);
    };

    PartsPage.prototype.reArrangeIndex = function() {
      var $part, i, j, part, _i, _len, _ref;
      j = this.parts.length - 1;
      _ref = this.parts;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        part = _ref[i];
        $part = $(part);
        $part.css({
          "z-index": j
        });
        j -= 1;
      }
    };

    PartsPage.prototype.onMouseWheel = function(e) {
      var dir;
      e.preventDefault();
      if (this.transitionRunning) {
        return;
      }
      dir = e.deltaY < 0 ? 1 : -1;
      this.changeSection(dir);
    };

    PartsPage.prototype.changeSection = function(dir) {
      var inEl, inTweenIndex, outEl, outTweenIndex,
        _this = this;
      this.currentSection += dir;
      if (this.currentSection < 0) {
        this.currentSection = this.partsTweens.length - 1;
      }
      if (this.currentSection > this.partsTweens.length - 1) {
        this.currentSection = 0;
      }
      this.transitionRunning = true;
      if (dir === 1) {
        inTweenIndex = this.currentSection;
        outTweenIndex = this.currentSection - 1 < 0 ? this.partsTweens.length - 1 : this.currentSection - 1;
      } else {
        inTweenIndex = this.currentSection;
        outTweenIndex = this.currentSection + 1 > this.partsTweens.length - 1 ? 0 : this.currentSection + 1;
      }
      if (dir === 1) {
        inEl = this.partsTweens[inTweenIndex].el;
        outEl = this.partsTweens[outTweenIndex].el;
        outEl.style.zIndex = 4;
        inEl.style.zIndex = 5;
        TweenMax.fromTo(outEl, 1, {
          y: 0
        }, {
          y: Model.windowH,
          force3D: true,
          ease: Expo.easeInOut
        });
        TweenMax.fromTo(inEl, 1, {
          y: Model.windowH
        }, {
          y: 0,
          force3D: true,
          ease: Expo.easeOut,
          onComplete: function() {
            return _this.transitionRunning = false;
          }
        });
      } else {
        inEl = this.partsTweens[inTweenIndex].el;
        outEl = this.partsTweens[outTweenIndex].el;
        outEl.style.zIndex = 4;
        inEl.style.zIndex = 5;
        TweenMax.fromTo(outEl, 1, {
          y: 0
        }, {
          y: -Model.windowH,
          force3D: true,
          ease: Expo.easeInOut
        });
        TweenMax.fromTo(inEl, 1, {
          y: -Model.windowH
        }, {
          y: 0,
          force3D: true,
          ease: Expo.easeOut,
          onComplete: function() {
            return _this.transitionRunning = false;
          }
        });
      }
    };

    PartsPage.prototype.resize = function() {
      var baseLineNum, basePhotoH, bottomContainerH, bottomVisualPos, maxVisualH, moreLines, offset, paragraphFontSize, paragraphH, paragraphLineNum, paragraphY, partHolderCss, photo, titleH, titleY, visualH, visualY, _i, _len, _ref;
      baseLineNum = 3;
      basePhotoH = 670;
      maxVisualH = 1020;
      offset = 50;
      _ref = this.photoParts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        photo = _ref[_i];
        paragraphH = photo.paragraphEl.clientHeight;
        titleH = photo.titleEl.clientHeight;
        paragraphFontSize = parseInt($(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, ''));
        paragraphLineNum = parseInt(paragraphH / paragraphFontSize);
        moreLines = paragraphLineNum - baseLineNum;
        visualH = basePhotoH - (moreLines * paragraphFontSize);
        visualH = (Model.windowH / maxVisualH) * visualH;
        visualH -= offset + 60;
        visualY = (Model.windowH >> 1) - (visualH >> 1) + offset - 20;
        titleY = (visualY >> 1) - (titleH >> 1) + offset;
        bottomVisualPos = visualY + visualH;
        paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1);
        photo.visualContainerEl.style.height = visualH + "px";
        photo.visualContainerEl.style.top = visualY + "px";
        photo.titleEl.style.top = titleY + "px";
        photo.paragraphEl.style.top = paragraphY + "px";
      }
      partHolderCss = {
        width: Model.windowW,
        height: Model.windowH
      };
      this.partHolders.css(partHolderCss);
      bottomContainerH = 0;
      Model.parentEl.css({
        height: bottomContainerH
      });
    };

    PartsPage.prototype.destroy = function() {
      PartsPage.__super__.destroy.call(this);
    };

    return PartsPage;

  })(Page);
  return PartsPage;
});
