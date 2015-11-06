var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page", "signals", "MouseWheel", "SubSideMenu", "WheelInerial"], function(Page, signals, wheel, SubSideMenu, wi) {
  "use strict";
  var PartsPage;
  PartsPage = (function(_super) {
    __extends(PartsPage, _super);

    PartsPage.prototype.transitionRunning = false;

    PartsPage.prototype.currentSection = 0;

    PartsPage.prototype.baseLineNum = 3;

    PartsPage.prototype.basePhotoW = 1400;

    PartsPage.prototype.basePhotoH = 934;

    PartsPage.prototype.photoOffset = 60;

    function PartsPage(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.resizePhotoParts = __bind(this.resizePhotoParts, this);
      this.positionCurrentSection = __bind(this.positionCurrentSection, this);
      this.resizePartsHolder = __bind(this.resizePartsHolder, this);
      this.activateScroll = __bind(this.activateScroll, this);
      this.runScrollDelayedCall = __bind(this.runScrollDelayedCall, this);
      this.launchBounceForceTween = __bind(this.launchBounceForceTween, this);
      this.onSideMenuClicked = __bind(this.onSideMenuClicked, this);
      this.updateAllImgSources = __bind(this.updateAllImgSources, this);
      this.updateImgSources = __bind(this.updateImgSources, this);
      this.changeSection = __bind(this.changeSection, this);
      this.onWheelInertia = __bind(this.onWheelInertia, this);
      this.onMouseWheel = __bind(this.onMouseWheel, this);
      this.decreaseSectionIndex = __bind(this.decreaseSectionIndex, this);
      this.increaseSectionIndex = __bind(this.increaseSectionIndex, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      scope.blankImg = Model.blankImg;
      PartsPage.__super__.constructor.call(this, id, scope);
    }

    PartsPage.prototype.init = function(cb) {
      PartsPage.__super__.init.call(this, cb);
    };

    PartsPage.prototype.ready = function() {
      var accordionWrapper, allCenteredParagraph, allTitles, i, o, part, subSideScope, _i, _len, _ref;
      PartsPage.__super__.ready.call(this);
      this.parts = this.element.find(".part-holder");
      this.partsTweens = [];
      _ref = this.parts;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        part = _ref[i];
        o = {};
        o.el = part;
        this.partsTweens[i] = o;
      }
      if (Model.isDesktop === true) {
        subSideScope = {
          num: this.partsTweens.length
        };
        this.subSideMenu = new SubSideMenu("sub-side-menu", subSideScope);
        this.element.parent().append(this.subSideMenu.element);
        this.subSideMenu.onSideMenuClicked = this.onSideMenuClicked;
        this.subSideMenu.init();
      }
      this.allCenteredHolders = this.element.find(".part-holder .centered-holder");
      this.allVisualParents = this.element.find(".part-holder .visual-parent");
      this.updateImgSources();
      if (Model.isDesktop === true) {
        this.inertia = new WheelInertia();
        this.inertia.addCallback(this.onWheelInertia);
      }
      if (Model.isDesktop === false) {
        allTitles = this.element.find(".part-holder .title");
        allCenteredParagraph = this.element.find(".part-holder.part-photo>div");
        accordionWrapper = this.element.find(".part-holder .accordion-wrapper-title");
        allTitles.css('color', "black");
        allCenteredParagraph.css('position', 'relative');
        accordionWrapper.css('top', 0);
      }
    };

    PartsPage.prototype.transitionIn = function() {
      $(window).on('mousewheel', this.onMouseWheel);
      if (Model.isDesktop === false) {
        this.updateAllImgSources();
      }
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
      if (Model.isDesktop === true) {
        this.tl.to(this.subSideMenu.element, 1, {
          x: 40,
          force3D: true,
          ease: Expo.easeInOut
        }, 1);
      }
      this.tl.pause(0);
    };

    PartsPage.prototype.increaseSectionIndex = function() {
      this.currentSection += 1;
    };

    PartsPage.prototype.decreaseSectionIndex = function() {
      this.currentSection -= 1;
    };

    PartsPage.prototype.onMouseWheel = function(e) {
      var delta;
      if (this.transitionRunning) {
        return;
      }
      if (Model.isDesktop === false) {
        return;
      }
      e.preventDefault();
      delta = e.deltaY;
      this.inertia.update(delta);
    };

    PartsPage.prototype.onWheelInertia = function(direction) {
      if (Model.isDesktop === false) {
        return;
      }
      if (direction < 0) {
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
      } else if (this.currentSection > this.partsTweens.length - 1) {
        this.currentSection = this.partsTweens.length - 1;
        this.launchBounceForceTween(this.currentPageYPos);
      } else {
        TweenMax.to(this.element, 0.8, {
          y: -Model.windowH * this.currentSection,
          force3D: true,
          ease: Expo.easeInOut
        });
      }
      this.runScrollDelayedCall();
      this.currentPageYPos = -Model.windowH * this.currentSection;
      this.subSideMenu.updateMenu(this.currentSection);
      this.updateImgSources();
    };

    PartsPage.prototype.updateImgSources = function() {
      var currentItem, nextItem, previousItem;
      currentItem = this.parts[this.currentSection];
      previousItem = this.parts[this.currentSection - 1];
      nextItem = this.parts[this.currentSection + 1];
      Util.SwitchImgLazySrcs(currentItem);
      Util.SwitchImgLazySrcs(previousItem);
      Util.SwitchImgLazySrcs(nextItem);
    };

    PartsPage.prototype.updateAllImgSources = function() {
      var part, _i, _len, _ref;
      _ref = this.parts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        Util.SwitchImgLazySrcs(part);
      }
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
      TweenMax.delayedCall(0.6, this.activateScroll);
    };

    PartsPage.prototype.activateScroll = function() {
      this.transitionRunning = false;
    };

    PartsPage.prototype.resizePartsHolder = function() {
      var $holder, $part, $visual, holder, i, part, partHolderCss, visual, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      _ref = this.partHolders;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        part = _ref[i];
        $part = $(part);
        partHolderCss = {
          top: Model.windowH * i,
          width: Model.windowW,
          height: Model.windowH
        };
        if (Model.isDesktop === false) {
          $part.css({
            position: "relative",
            overflow: "visible",
            margin: "40px 0"
          });
        } else {
          $part.css(partHolderCss);
        }
      }
      if (Model.isDesktop === false) {
        this.element.css({
          position: "relative"
        });
        _ref1 = this.allCenteredHolders;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          holder = _ref1[_j];
          $holder = $(holder);
          $holder.css({
            position: 'relative'
          });
        }
        _ref2 = this.allVisualParents;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          visual = _ref2[_k];
          $visual = $(visual);
          $visual.css({
            position: 'relative'
          });
        }
      }
    };

    PartsPage.prototype.positionCurrentSection = function() {
      TweenMax.set(this.element, {
        y: -this.currentSection * Model.windowH,
        force3D: true
      });
    };

    PartsPage.prototype.resizePhotoParts = function() {
      var bottomVisualPos, moreLines, paragraphFontSize, paragraphH, paragraphLineNum, paragraphY, photo, photoH, photoW, scale, titleH, titleY, visualH, visualX, visualY, _i, _len, _ref;
      scale = (Model.windowH / this.basePhotoW) * 1;
      _ref = this.photoParts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        photo = _ref[_i];
        paragraphH = photo.paragraphEl.clientHeight;
        titleH = photo.titleEl.clientHeight;
        paragraphFontSize = parseInt($(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, ''));
        paragraphLineNum = parseInt(paragraphH / paragraphFontSize);
        moreLines = paragraphLineNum - this.baseLineNum;
        photoH = this.basePhotoH * scale;
        photoW = this.basePhotoW * scale;
        visualH = photoH;
        visualX = (Model.windowW >> 1) - (photoW >> 1);
        visualY = Model.windowH < this.basePhotoH ? 100 : (Model.windowH >> 1) - (photoH >> 1) - this.photoOffset;
        titleY = visualY + (visualH >> 1) - (titleH >> 1);
        bottomVisualPos = visualY + photoH;
        paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1);
        if (Model.isDesktop === true) {
          TweenMax.set(photo.visualContainerEl, {
            scale: scale,
            force3D: true,
            transformOrigin: "0% 0%"
          });
          photo.visualContainerEl.style.left = visualX + "px";
          photo.visualContainerEl.style.top = visualY + "px";
          photo.titleEl.style.top = titleY + "px";
          photo.paragraphEl.style.top = paragraphY + "px";
        } else {
          photo.visualContainerEl.style.width = "100%";
          photo.visualContainerEl.style.height = "auto";
        }
      }
    };

    PartsPage.prototype.resize = function() {
      this.resizePartsHolder();
      this.positionCurrentSection();
      this.resizePhotoParts();
      if (Model.isDesktop === true) {
        this.subSideMenu.resize();
      }
    };

    PartsPage.prototype.destroy = function() {
      if (Model.isDesktop === true) {
        this.subSideMenu.destroy();
      }
      PartsPage.__super__.destroy.call(this);
    };

    return PartsPage;

  })(Page);
  return PartsPage;
});
