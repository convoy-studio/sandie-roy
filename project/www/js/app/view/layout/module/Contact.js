var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var Contact;
  Contact = (function(_super) {
    __extends(Contact, _super);

    Contact.prototype.isOpened = false;

    function Contact(id, scope) {
      this.onResize = __bind(this.onResize, this);
      this.onCloseClicked = __bind(this.onCloseClicked, this);
      this.onReverseComplete = __bind(this.onReverseComplete, this);
      this.onComplete = __bind(this.onComplete, this);
      this.close = __bind(this.close, this);
      this.open = __bind(this.open, this);
      this.toggle = __bind(this.toggle, this);
      this.contactClicked = __bind(this.contactClicked, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      scope.logo = Loader.getSvg("logo");
      scope.closeIcon = Loader.getSvg("close");
      Contact.__super__.constructor.call(this, id, scope);
    }

    Contact.prototype.init = function() {
      TweenMax.delayedCall(0.1, this.ready);
    };

    Contact.prototype.ready = function() {
      var $back, $closeBtn, $logo;
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
    };

    Contact.prototype.contactClicked = function() {
      this.toggle();
    };

    Contact.prototype.toggle = function() {
      if (this.isOpened) {
        this.close();
      } else {
        this.open();
      }
    };

    Contact.prototype.open = function() {
      this.isOpened = true;
      this.element.css({
        display: "block",
        opacity: 1
      });
      this.tl.timeScale(1.2).play();
    };

    Contact.prototype.close = function() {
      this.isOpened = false;
      this.toCloseEl.off("click", this.onCloseClicked);
      this.tl.timeScale(1.6).reverse();
    };

    Contact.prototype.onComplete = function() {
      this.toCloseEl.on("click", this.onCloseClicked);
    };

    Contact.prototype.onReverseComplete = function() {
      this.element.css({
        display: "none",
        opacity: 0
      });
    };

    Contact.prototype.onCloseClicked = function() {
      this.close();
    };

    Contact.prototype.onResize = function() {
      var mContainerCss;
      mContainerCss = {
        left: (Model.windowW >> 1) - (this.middleContainer.width() >> 1),
        top: (Model.windowH >> 1) - (this.middleContainer.height() >> 1)
      };
      this.middleContainer.css(mContainerCss);
    };

    return Contact;

  })(View);
  return Contact;
});
