var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["View"], function(View) {
  var Contact;
  Contact = (function() {
    class Contact extends View {
      constructor(id, scope) {
        scope.logo = Loader.getSvg("logo");
        scope.closeIcon = Loader.getSvg("close");
        super(id, scope);
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        this.contactClicked = this.contactClicked.bind(this);
        this.toggle = this.toggle.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onReverseComplete = this.onReverseComplete.bind(this);
        this.onCloseClicked = this.onCloseClicked.bind(this);
        this.onResize = this.onResize.bind(this);
      }

      init() {
        boundMethodCheck(this, Contact);
        TweenMax.delayedCall(0.1, this.ready);
      }

      ready() {
        var $back, $closeBtn, $logo;
        boundMethodCheck(this, Contact);
        this.middleContainer = this.element.find(".middle-container");
        $back = this.element.find(".back");
        $logo = this.element.find(".logo");
        $closeBtn = this.element.find(".close-btn");
        this.toCloseEl = this.element.find(".close-btn, .back");
        this.tl = new TimelineMax({
          onComplete: this.onComplete,
          onReverseComplete: this.onReverseComplete
        });
        this.tl.from($back, 1, {
          opacity: 0,
          ease: Expo.easeInOut
        }, 0);
        this.tl.from(this.middleContainer, 1, {
          scale: 1.2,
          opacity: 0,
          force3D: true,
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
        this.onResize();
        this.element.css({
          "display": "none"
        });
        Signal.contactClicked.add(this.contactClicked);
      }

      contactClicked() {
        boundMethodCheck(this, Contact);
        this.toggle();
      }

      toggle() {
        boundMethodCheck(this, Contact);
        if (this.isOpened) {
          this.close();
        } else {
          this.open();
        }
      }

      open() {
        boundMethodCheck(this, Contact);
        this.isOpened = true;
        this.element.css({
          display: "block",
          opacity: 1
        });
        this.onResize();
        this.tl.timeScale(1.2).play();
      }

      close() {
        boundMethodCheck(this, Contact);
        this.isOpened = false;
        this.toCloseEl.off("click", this.onCloseClicked);
        this.tl.timeScale(1.6).reverse();
      }

      onComplete() {
        boundMethodCheck(this, Contact);
        this.toCloseEl.on("click", this.onCloseClicked);
      }

      onReverseComplete() {
        boundMethodCheck(this, Contact);
        this.element.css({
          display: "none",
          opacity: 0
        });
      }

      onCloseClicked() {
        boundMethodCheck(this, Contact);
        this.close();
      }

      onResize() {
        var mContainerCss;
        boundMethodCheck(this, Contact);
        mContainerCss = {
          left: (Model.windowW >> 1) - (this.middleContainer.width() >> 1),
          top: (Model.windowH >> 1) - (this.middleContainer.height() >> 1)
        };
        this.middleContainer.css(mContainerCss);
      }

    };

    Contact.prototype.isOpened = false;

    return Contact;

  }).call(this);
  return Contact;
});
