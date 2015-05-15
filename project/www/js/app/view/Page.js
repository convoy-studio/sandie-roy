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
      var $photoPart, $photoParts, i, p, photoPart, _i, _len;
      this.partHolders = this.element.find(".part-holder");
      $photoParts = this.element.find(".part-photo");
      this.photoParts = [];
      for (i = _i = 0, _len = $photoParts.length; _i < _len; i = ++_i) {
        photoPart = $photoParts[i];
        $photoPart = $(photoPart);
        p = {};
        p.el = $photoPart.get(0);
        p.align = Util.IsEven(i) ? "left" : "right";
        $photoPart.addClass(p.align);
        p.titleEl = $photoPart.find(".title").parent().get(0);
        p.visualContainerEl = $photoPart.find(".visual-container").get(0);
        p.paragraphEl = $photoPart.find(".paragraph").parent().get(0);
        this.photoParts.push(p);
      }
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
      var baseLineNum, basePhotoH, bottomVisualPos, elementCss, maxVisualH, moreLines, paragraphFontSize, paragraphH, paragraphLineNum, paragraphY, partHolderCss, photo, titleH, titleY, visualH, visualY, _i, _len, _ref;
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
        top: Model.windowH
      };
      this.partHolders.css(partHolderCss);
      this.element.css(elementCss);
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
