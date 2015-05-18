var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page", "signals"], function(Page, signals) {
  "use strict";
  var PartsPage;
  PartsPage = (function(_super) {
    __extends(PartsPage, _super);

    function PartsPage(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.transitionOutCompleted = __bind(this.transitionOutCompleted, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionInCompleted = __bind(this.transitionInCompleted, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      PartsPage.__super__.constructor.call(this, id, scope);
    }

    PartsPage.prototype.init = function(cb) {
      PartsPage.__super__.init.call(this, cb);
    };

    PartsPage.prototype.ready = function() {
      PartsPage.__super__.ready.call(this);
    };

    PartsPage.prototype.addAnimations = function() {
      this.tl.fromTo(this.element, 1, {
        y: Model.windowH + 10
      }, {
        y: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0);
      this.tl.pause(0);
    };

    PartsPage.prototype.transitionIn = function() {
      this.element.css({
        "z-index": 6
      });
      this.tl.timeScale(1.2);
      this.tl.tweenTo(this.tl.duration());
      Signal.onPartPageTransitionIn.dispatch();
    };

    PartsPage.prototype.transitionInCompleted = function() {
      PartsPage.__super__.transitionInCompleted.call(this);
      Signal.onPartPageTransitionInCompleted.dispatch();
    };

    PartsPage.prototype.transitionOut = function() {
      Signal.onPartPageTransitionOut.dispatch();
      PartsPage.__super__.transitionOut.call(this);
    };

    PartsPage.prototype.transitionOutCompleted = function() {
      PartsPage.__super__.transitionOutCompleted.call(this);
      this.element.css({
        "z-index": 4
      });
    };

    PartsPage.prototype.resize = function() {
      var baseLineNum, basePhotoH, bottomContainerH, bottomVisualPos, elementCss, maxVisualH, moreLines, paragraphFontSize, paragraphH, paragraphLineNum, paragraphY, partHolderCss, photo, titleH, titleY, visualH, visualY, _i, _len, _ref;
      baseLineNum = 3;
      basePhotoH = 670;
      maxVisualH = 1020;
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
        visualY = (Model.windowH >> 1) - (visualH >> 1) - 40;
        titleY = (visualY >> 1) - (titleH >> 1);
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
      elementCss = {
        y: Model.windowH,
        force3D: true
      };
      this.partHolders.css(partHolderCss);
      TweenMax.set(this.element, elementCss);
      bottomContainerH = this.partHolders.length * Model.windowH;
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
