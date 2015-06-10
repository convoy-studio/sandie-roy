var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page", "signals", "MouseWheel", "Hammer", "SubSideMenu"], function(Page, signals, wheel, Hammer, SubSideMenu) {
  "use strict";
  var PartsPage;
  PartsPage = (function(_super) {
    __extends(PartsPage, _super);

    PartsPage.prototype.transitionRunning = false;

    PartsPage.prototype.currentSection = 0;

    function PartsPage(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.activateScroll = __bind(this.activateScroll, this);
      this.runScrollDelayedCall = __bind(this.runScrollDelayedCall, this);
      this.launchBounceForceTween = __bind(this.launchBounceForceTween, this);
      this.onSideMenuClicked = __bind(this.onSideMenuClicked, this);
      this.changeSection = __bind(this.changeSection, this);
      this.onMouseWheel = __bind(this.onMouseWheel, this);
      this.decreaseSectionIndex = __bind(this.decreaseSectionIndex, this);
      this.increaseSectionIndex = __bind(this.increaseSectionIndex, this);
      this.onSwipe = __bind(this.onSwipe, this);
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
      var i, o, part, subSideScope, _i, _len, _ref;
      PartsPage.__super__.ready.call(this);
      this.hammertime.get("swipe").set({
        direction: Hammer.DIRECTION_VERTICAL,
        threshold: 5,
        velocity: 0.5
      });
      this.hammertime.on("swipeup swipedown", this.onSwipe);
      this.parts = this.element.find(".part-holder");
      this.partsTweens = [];
      _ref = this.parts;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        part = _ref[i];
        o = {};
        o.el = part;
        this.partsTweens[i] = o;
      }
      subSideScope = {
        num: this.partsTweens.length
      };
      this.subSideMenu = new SubSideMenu("sub-side-menu", subSideScope);
      this.element.parent().append(this.subSideMenu.element);
      this.subSideMenu.onSideMenuClicked = this.onSideMenuClicked;
      this.subSideMenu.init();
    };

    PartsPage.prototype.transitionIn = function() {
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
      this.tl.to(this.subSideMenu.element, 1, {
        x: 40,
        force3D: true,
        ease: Expo.easeInOut
      }, 1);
      this.tl.pause(0);
    };

    PartsPage.prototype.onSwipe = function(e) {
      e.preventDefault();
      switch (e.type) {
        case "swipeup":
          this.increaseSectionIndex();
          break;
        case "swipedown":
          this.decreaseSectionIndex();
          break;
      }
      this.changeSection();
    };

    PartsPage.prototype.increaseSectionIndex = function() {
      this.currentSection += 1;
    };

    PartsPage.prototype.decreaseSectionIndex = function() {
      this.currentSection -= 1;
    };

    PartsPage.prototype.onMouseWheel = function(e) {
      e.preventDefault();
      if (this.transitionRunning) {
        return;
      }
      if (e.deltaY < 0) {
        this.increaseSectionIndex();
      } else {
        this.decreaseSectionIndex();
      }
      this.changeSection();
    };

    PartsPage.prototype.changeSection = function() {
      this.transitionRunning = true;
      if (this.currentSection < 0) {
        this.currentSection = 0;
        this.launchBounceForceTween(0);
        this.runScrollDelayedCall();
      } else if (this.currentSection > this.partsTweens.length - 1) {
        this.currentSection = this.partsTweens.length - 1;
        this.launchBounceForceTween(this.currentPageYPos);
        this.runScrollDelayedCall();
      } else {
        this.runScrollDelayedCall();
        TweenMax.to(this.element, 0.8, {
          y: -Model.windowH * this.currentSection,
          force3D: true,
          ease: Expo.easeInOut
        });
      }
      this.currentPageYPos = -Model.windowH * this.currentSection;
      this.subSideMenu.updateMenu(this.currentSection);
    };

    PartsPage.prototype.onSideMenuClicked = function(index) {
      this.currentSection = index;
      this.changeSection();
    };

    PartsPage.prototype.launchBounceForceTween = function(yPos) {
      var offset;
      offset = 40;
      TweenMax.to(this.element, 0.4, {
        y: yPos - offset,
        force3D: true,
        ease: Expo.easeOut
      });
      TweenMax.to(this.element, 0.4, {
        delay: 0.2,
        y: yPos,
        force3D: true,
        ease: Back.easeOut
      });
    };

    PartsPage.prototype.runScrollDelayedCall = function() {
      TweenMax.killDelayedCallsTo(this.activateScroll);
      TweenMax.delayedCall(1.2, this.activateScroll);
    };

    PartsPage.prototype.activateScroll = function() {
      this.transitionRunning = false;
    };

    PartsPage.prototype.resize = function() {
      var $part, baseLineNum, basePhotoH, basePhotoW, bottomContainerH, bottomVisualPos, i, moreLines, offset, paragraphFontSize, paragraphH, paragraphLineNum, paragraphY, part, partHolderCss, photo, photoH, photoW, ratio, scale, titleH, titleY, visualH, visualX, visualY, _i, _j, _len, _len1, _ref, _ref1;
      baseLineNum = 3;
      basePhotoW = 1400;
      basePhotoH = 934;
      offset = 60;
      _ref = this.partHolders;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        part = _ref[i];
        $part = $(part);
        partHolderCss = {
          top: Model.windowH * i,
          width: Model.windowW,
          height: Model.windowH
        };
        $part.css(partHolderCss);
      }
      bottomContainerH = 0;
      Model.parentEl.css({
        height: bottomContainerH
      });
      TweenMax.set(this.element, {
        y: -this.currentSection * Model.windowH,
        force3D: true
      });
      scale = (Model.windowH / basePhotoW) * 1;
      ratio = Model.windowW / Model.windowH;
      _ref1 = this.photoParts;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        photo = _ref1[_j];
        paragraphH = photo.paragraphEl.clientHeight;
        titleH = photo.titleEl.clientHeight;
        paragraphFontSize = parseInt($(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, ''));
        paragraphLineNum = parseInt(paragraphH / paragraphFontSize);
        moreLines = paragraphLineNum - baseLineNum;
        photoH = basePhotoH * scale;
        photoW = basePhotoW * scale;
        visualH = photoH;
        visualX = (Model.windowW >> 1) - (photoW >> 1);
        visualY = Model.windowH < basePhotoH ? 100 : (Model.windowH >> 1) - (photoH >> 1) - offset;
        titleY = visualY + (visualH >> 1) - (titleH >> 1);
        bottomVisualPos = visualY + photoH;
        paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1);
        TweenMax.set(photo.visualContainerEl, {
          scale: scale,
          force3D: true,
          transformOrigin: "0% 0%"
        });
        photo.visualContainerEl.style.left = visualX + "px";
        photo.visualContainerEl.style.top = visualY + "px";
        photo.titleEl.style.top = titleY + "px";
        photo.paragraphEl.style.top = paragraphY + "px";
      }
      this.subSideMenu.resize();
    };

    PartsPage.prototype.destroy = function() {
      this.subSideMenu.destroy();
      PartsPage.__super__.destroy.call(this);
    };

    return PartsPage;

  })(Page);
  return PartsPage;
});
