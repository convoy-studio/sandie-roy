var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["Page", "signals", "MouseWheel", "SubSideMenu", "WheelInerial"], function(Page, signals, wheel, SubSideMenu, wi) {
  "use strict";
  var PartsPage;
  PartsPage = (function() {
    class PartsPage extends Page {
      constructor(id, scope) {
        scope.blankImg = Model.blankImg;
        super(id, scope);
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        this.transitionIn = this.transitionIn.bind(this);
        this.transitionOut = this.transitionOut.bind(this);
        this.addAnimations = this.addAnimations.bind(this);
        this.increaseSectionIndex = this.increaseSectionIndex.bind(this);
        this.decreaseSectionIndex = this.decreaseSectionIndex.bind(this);
        this.onMouseWheel = this.onMouseWheel.bind(this);
        this.onWheelInertia = this.onWheelInertia.bind(this);
        this.changeSection = this.changeSection.bind(this);
        this.updateImgSources = this.updateImgSources.bind(this);
        this.updateAllImgSources = this.updateAllImgSources.bind(this);
        this.onSideMenuClicked = this.onSideMenuClicked.bind(this);
        this.launchBounceForceTween = this.launchBounceForceTween.bind(this);
        this.runScrollDelayedCall = this.runScrollDelayedCall.bind(this);
        this.activateScroll = this.activateScroll.bind(this);
        this.resizePartsHolder = this.resizePartsHolder.bind(this);
        this.positionCurrentSection = this.positionCurrentSection.bind(this);
        this.resizePhotoParts = this.resizePhotoParts.bind(this);
        // mobileVisualH = $(photo.visualContainerEl).height()
        // photo.titleEl.style.top = (mobileVisualH >> 1) + ($(photo.titleEl).height() >> 1) + "px"
        this.resize = this.resize.bind(this);
        this.destroy = this.destroy.bind(this);
      }

      init(cb) {
        boundMethodCheck(this, PartsPage);
        super.init(cb);
      }

      ready() {
        var accordionWrapper, allCenteredParagraph, allTitles, i, j, len, o, part, ref, subSideScope;
        boundMethodCheck(this, PartsPage);
        super.ready();
        this.parts = this.element.find(".part-holder");
        this.partsTweens = [];
        ref = this.parts;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          part = ref[i];
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
      }

      transitionIn() {
        boundMethodCheck(this, PartsPage);
        $(window).on('mousewheel', this.onMouseWheel);
        if (Model.isDesktop === false) {
          this.updateAllImgSources();
        }
        super.transitionIn();
      }

      transitionOut() {
        boundMethodCheck(this, PartsPage);
        $(window).off('mousewheel', this.onMouseWheel);
        super.transitionOut();
      }

      addAnimations() {
        boundMethodCheck(this, PartsPage);
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
      }

      increaseSectionIndex() {
        boundMethodCheck(this, PartsPage);
        this.currentSection += 1;
      }

      decreaseSectionIndex() {
        boundMethodCheck(this, PartsPage);
        this.currentSection -= 1;
      }

      onMouseWheel(e) {
        var delta;
        boundMethodCheck(this, PartsPage);
        if (this.transitionRunning) {
          return;
        }
        if (Model.isDesktop === false) {
          return;
        }
        e.preventDefault();
        delta = e.deltaY;
        this.inertia.update(delta);
      }

      onWheelInertia(direction) {
        boundMethodCheck(this, PartsPage);
        if (Model.isDesktop === false) {
          return;
        }
        if (direction < 0) {
          this.increaseSectionIndex();
        } else {
          this.decreaseSectionIndex();
        }
        this.changeSection();
      }

      changeSection() {
        boundMethodCheck(this, PartsPage);
        // if @currentSection < 0 then @currentSection = @partsTweens.length-1
        // if @currentSection > @partsTweens.length-1 then @currentSection = 0
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
      }

      updateImgSources() {
        var currentItem, nextItem, previousItem;
        boundMethodCheck(this, PartsPage);
        currentItem = this.parts[this.currentSection];
        previousItem = this.parts[this.currentSection - 1];
        nextItem = this.parts[this.currentSection + 1];
        Util.SwitchImgLazySrcs(currentItem);
        Util.SwitchImgLazySrcs(previousItem);
        Util.SwitchImgLazySrcs(nextItem);
      }

      updateAllImgSources() {
        var j, len, part, ref;
        boundMethodCheck(this, PartsPage);
        ref = this.parts;
        for (j = 0, len = ref.length; j < len; j++) {
          part = ref[j];
          Util.SwitchImgLazySrcs(part);
        }
      }

      onSideMenuClicked(index) {
        boundMethodCheck(this, PartsPage);
        this.currentSection = index;
        this.changeSection();
      }

      launchBounceForceTween(yPos) {
        var offset;
        boundMethodCheck(this, PartsPage);
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
      }

      runScrollDelayedCall() {
        boundMethodCheck(this, PartsPage);
        TweenMax.killDelayedCallsTo(this.activateScroll);
        TweenMax.delayedCall(0.6, this.activateScroll);
      }

      activateScroll() {
        boundMethodCheck(this, PartsPage);
        this.transitionRunning = false;
      }

      resizePartsHolder() {
        var $holder, $part, $visual, holder, i, j, k, l, len, len1, len2, part, partCss, partHolderCss, ref, ref1, ref2, visual;
        boundMethodCheck(this, PartsPage);
        ref = this.partHolders;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          part = ref[i];
          $part = $(part);
          partHolderCss = {
            top: Model.windowH * i,
            width: Model.windowW,
            height: Model.windowH
          };
          if (Model.isDesktop === false) {
            partCss = {
              position: "relative",
              overflow: "visible",
              margin: "40px 0"
            };
            if (i === 0) {
              partCss['margin-top'] = Model.windowH * 0.2;
            }
            $part.css(partCss);
          } else {
            $part.css(partHolderCss);
          }
        }
        if (Model.isDesktop === false) {
          this.element.css({
            position: "relative"
          });
          ref1 = this.allCenteredHolders;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            holder = ref1[k];
            $holder = $(holder);
            $holder.css({
              position: 'relative'
            });
          }
          ref2 = this.allVisualParents;
          for (l = 0, len2 = ref2.length; l < len2; l++) {
            visual = ref2[l];
            $visual = $(visual);
            $visual.css({
              position: 'relative'
            });
          }
        }
      }

      positionCurrentSection() {
        boundMethodCheck(this, PartsPage);
        TweenMax.set(this.element, {
          y: -this.currentSection * Model.windowH,
          force3D: true
        });
      }

      resizePhotoParts() {
        var bottomVisualPos, j, len, moreLines, paragraphFontSize, paragraphH, paragraphLineNum, paragraphY, photo, photoH, photoW, ref, scale, titleH, titleY, visualH, visualX, visualY;
        boundMethodCheck(this, PartsPage);
        scale = (Model.windowH / this.basePhotoW) * 1;
        ref = this.photoParts;
        for (j = 0, len = ref.length; j < len; j++) {
          photo = ref[j];
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
      }

      resize() {
        boundMethodCheck(this, PartsPage);
        this.resizePartsHolder();
        this.positionCurrentSection();
        this.resizePhotoParts();
        if (Model.isDesktop === true) {
          this.subSideMenu.resize();
        }
      }

      destroy() {
        boundMethodCheck(this, PartsPage);
        if (Model.isDesktop === true) {
          this.subSideMenu.destroy();
        }
        super.destroy();
      }

    };

    PartsPage.prototype.transitionRunning = false;

    PartsPage.prototype.currentSection = 0;

    PartsPage.prototype.baseLineNum = 3;

    PartsPage.prototype.basePhotoW = 1400;

    PartsPage.prototype.basePhotoH = 934;

    PartsPage.prototype.photoOffset = 60;

    return PartsPage;

  }).call(this);
  return PartsPage;
});
