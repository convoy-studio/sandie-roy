var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["View"], function(View) {
  var Slideshow;
  Slideshow = (function() {
    class Slideshow extends View {
      constructor(id, scope) {
        scope = scope || {};
        scope.logo = Loader.getSvg("logo");
        scope.closeIcon = Loader.getSvg("close");
        super(id, scope);
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        this.onSlideshowOpen = this.onSlideshowOpen.bind(this);
        this.getSlideshowRawHTML = this.getSlideshowRawHTML.bind(this);
        this.toggle = this.toggle.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.updateImgSources = this.updateImgSources.bind(this);
        this.onClicked = this.onClicked.bind(this);
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.tweenItemToIndex = this.tweenItemToIndex.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onReverseComplete = this.onReverseComplete.bind(this);
        this.onCloseClicked = this.onCloseClicked.bind(this);
        this.getMousePosByClickEvent = this.getMousePosByClickEvent.bind(this);
        this.onResize = this.onResize.bind(this);
      }

      init() {
        boundMethodCheck(this, Slideshow);
        TweenMax.delayedCall(0.1, this.ready);
        this.itemBaseSize = {
          w: Model.personBaseSize.w * 2,
          h: Model.personBaseSize.h * 2
        };
        this.mobile = Model.mobile;
      }

      ready() {
        var $back, $closeBtn, $logo;
        boundMethodCheck(this, Slideshow);
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
      }

      onSlideshowOpen(index, items, folderUrl) {
        var $el, $items, i, item, j, len;
        boundMethodCheck(this, Slideshow);
        this.folderUrl = folderUrl;
        this.currentIndex = index;
        this.items = items;
        $el = $(this.getSlideshowRawHTML());
        this.middleContainer.html($el);
        $items = this.middleContainer.find(".item-wrapper");
        for (i = j = 0, len = $items.length; j < len; i = ++j) {
          item = $items[i];
          this.items[i].el = item;
        }
        this.open();
      }

      getSlideshowRawHTML() {
        var html, item, j, len, ref;
        boundMethodCheck(this, Slideshow);
        html = '';
        ref = this.items;
        for (j = 0, len = ref.length; j < len; j++) {
          item = ref[j];
          html += '<div class="item-wrapper btn"> <img lazy-src="' + this.folderUrl + item.id + ".jpg" + '" src="' + Model.blankImg + '"> <div class="down-text">' + item.text + '</div> </div>';
        }
        return html;
      }

      toggle() {
        boundMethodCheck(this, Slideshow);
        if (this.isOpened) {
          this.close();
        } else {
          this.open();
        }
      }

      open() {
        boundMethodCheck(this, Slideshow);
        this.isOpened = true;
        this.element.css({
          display: "block",
          opacity: 1
        });
        this.onResize();
        this.tl.timeScale(1.2).play();
        this.tweenItemToIndex(true);
        this.element.on("click", this.onClicked);
        $(document).bind("keyup", this.onKeyPress);
      }

      close() {
        boundMethodCheck(this, Slideshow);
        this.isOpened = false;
        this.toCloseEl.off("click", this.onCloseClicked);
        this.tl.timeScale(1.6).reverse();
        this.element.off("click", this.onClicked);
        $(document).unbind("keyup", this.onKeyPress);
      }

      onKeyPress(e) {
        var code;
        boundMethodCheck(this, Slideshow);
        code = e.keyCode || e.which;
        switch (code) {
          case 27: //# esc
            this.close();
            break;
          case 39: //# right
            if (TweenMax.isTweening(this.middleContainer)) {
              return;
            }
            this.increase();
            this.tweenItemToIndex();
            break;
          case 37: //# left
            if (TweenMax.isTweening(this.middleContainer)) {
              return;
            }
            this.decrease();
            this.tweenItemToIndex();
            break;
        }
      }

      updateImgSources() {
        var currentItem, nextItem, previousItem;
        boundMethodCheck(this, Slideshow);
        currentItem = this.items[this.currentIndex];
        previousItem = this.items[this.currentIndex - 1];
        nextItem = this.items[this.currentIndex + 1];
        Util.SwitchImgLazySrcs(currentItem.el);
        Util.SwitchImgLazySrcs(previousItem != null ? previousItem.el : void 0);
        Util.SwitchImgLazySrcs(nextItem != null ? nextItem.el : void 0);
      }

      onClicked(e) {
        var mouse;
        boundMethodCheck(this, Slideshow);
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
      }

      increase() {
        boundMethodCheck(this, Slideshow);
        this.currentIndex += 1;
        if (this.currentIndex > this.items.length - 1) {
          this.currentIndex = 0;
        }
      }

      decrease() {
        boundMethodCheck(this, Slideshow);
        this.currentIndex -= 1;
        if (this.currentIndex < 0) {
          this.currentIndex = this.items.length - 1;
        }
      }

      tweenItemToIndex(force) {
        var item, time;
        boundMethodCheck(this, Slideshow);
        item = this.items[this.currentIndex];
        time = force ? 0 : 0.7;
        this.tween = TweenMax.to(this.middleContainer, time, {
          x: item.centerPosX,
          force3D: true,
          ease: Expo.easeInOut
        });
        this.updateImgSources();
      }

      onComplete() {
        boundMethodCheck(this, Slideshow);
        this.toCloseEl.on("click", this.onCloseClicked);
      }

      onReverseComplete() {
        boundMethodCheck(this, Slideshow);
        this.element.css({
          display: "none",
          opacity: 0
        });
      }

      onCloseClicked() {
        boundMethodCheck(this, Slideshow);
        this.close();
      }

      getMousePosByClickEvent(e) {
        var x, y;
        boundMethodCheck(this, Slideshow);
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
      }

      onResize() {
        var i, item, itemCss, itemH, itemRemainW, itemW, j, len, mContainerCss, paddingBetween, ref, scale;
        boundMethodCheck(this, Slideshow);
        scale = (Model.windowW / 1360) * 1;
        scale = Util.Limit(0.5, 1.4, scale);
        itemW = this.itemBaseSize.w * scale;
        itemH = this.itemBaseSize.h * scale;
        itemRemainW = Model.windowW - itemW;
        paddingBetween = (itemRemainW >> 1) - (itemW * 0.1);
        if (this.items != null) {
          ref = this.items;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            item = ref[i];
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
      }

    };

    Slideshow.prototype.isOpened = false;

    return Slideshow;

  }).call(this);
  return Slideshow;
});
