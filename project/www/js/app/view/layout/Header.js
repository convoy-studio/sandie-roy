var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  "use strict";
  var Header;
  Header = (function(_super) {
    __extends(Header, _super);

    Header.prototype.menuOpenTime = 2;

    function Header(id, scope) {
      this.onResize = __bind(this.onResize, this);
      this.onMenuReverseComplete = __bind(this.onMenuReverseComplete, this);
      this.menuContainerMouseEnter = __bind(this.menuContainerMouseEnter, this);
      this.menuContainerMouseLeft = __bind(this.menuContainerMouseLeft, this);
      this.closeMenu = __bind(this.closeMenu, this);
      this.openMenu = __bind(this.openMenu, this);
      this.toggleMenu = __bind(this.toggleMenu, this);
      this.onMenuClicked = __bind(this.onMenuClicked, this);
      this.hightlightLi = __bind(this.hightlightLi, this);
      this.resetLiHightlight = __bind(this.resetLiHightlight, this);
      this.onRouteChanged = __bind(this.onRouteChanged, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      var i, k, l, menu, page, previews, share, v, _i, _len, _ref;
      scope = {};
      scope.logo = Loader.getSvg("logo");
      scope.fr = Model.content.fr;
      scope.en = Model.content.en;
      scope.menuBtnTxt = Model.content.menu;
      previews = Model.routing.slice(0, Model.routing.length - 1);
      menu = [];
      for (_i = 0, _len = previews.length; _i < _len; _i++) {
        page = previews[_i];
        l = {};
        l.id = page.id;
        l.name = page.scope.title;
        l.isLast = false;
        menu.push(l);
      }
      menu[menu.length - 1].isLast = true;
      scope.menu = menu;
      share = [];
      i = 0;
      _ref = Model.content.social;
      for (k in _ref) {
        v = _ref[k];
        v.id = Util.ConvertToSlug(v.name);
        v.name = Util.CapitalizeFirstLetter(v.name);
        v.btnMode = i === 0 ? false : true;
        share.push(v);
        i += 1;
      }
      scope.share = share;
      Header.__super__.constructor.call(this, id, scope);
    }

    Header.prototype.init = function() {
      this.menuIsOpened = false;
      Signal.onResize.add(this.onResize);
      TweenMax.delayedCall(0.1, this.ready);
    };

    Header.prototype.ready = function() {
      var $background, $contact, $langContainer, $langContainerAA, $lines, $linksName, $linksSeparator, $logoPath, $menuBtn, $menuTxt, $sharerName, backgroundH, burgerDelay, delay, posY,
        _this = this;
      CSSPlugin.defaultTransformPerspective = 600;
      this.linkMenu = this.element.find("ul.link-menu");
      this.shareMenu = this.element.find("ul.share-menu");
      this.menuLi = this.element.find(".menu-container .link-menu li");
      this.menuContainer = this.element.find(".menu-container");
      $menuBtn = this.element.find(".menu-btn");
      $background = this.element.find(".background");
      $lines = this.element.find(".line");
      $logoPath = this.element.find(".logo svg path");
      $langContainer = this.element.find(".lang-container");
      $langContainerAA = $langContainer.find("a");
      $menuTxt = $menuBtn.find(".menu-txt");
      $linksName = Util.TranformArrayFromMiddleAndOut(this.element.find(".link-menu .name"));
      $linksSeparator = Util.TranformArrayFromMiddleAndOut(this.element.find(".link-menu .separator"));
      $sharerName = Util.TranformArrayFromMiddleAndOut(this.element.find(".share-menu .name"));
      backgroundH = $background.height();
      delay = 0.1;
      this.menuTl = new TimelineMax({
        onReverseComplete: this.onMenuReverseComplete
      });
      this.menuTl.from($background, 1, {
        y: -backgroundH,
        force3D: true,
        ease: Expo.easeInOut
      }, 0);
      this.menuTl.staggerFrom($linksName, 1, {
        y: -20,
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 50% -30px",
        force3D: true,
        ease: Power2.easeInOut
      }, 0.02, delay + 0.1);
      this.menuTl.staggerFrom($linksSeparator, 1, {
        y: 0,
        rotationX: -90,
        transformOrigin: "50% 50% -30px",
        force3D: true,
        ease: Power2.easeInOut
      }, 0.02, delay + 0.1);
      this.menuTl.staggerFrom($sharerName, 1, {
        y: -20,
        rotationX: -90,
        transformOrigin: "50% 50% -30px",
        opacity: 0,
        force3D: true,
        ease: Power2.easeInOut
      }, 0.02, delay + 0.1);
      this.menuTl.pause(0);
      burgerDelay = 0.1;
      posY = 8;
      this.burgerTl = new TimelineMax();
      this.burgerTl.to($lines.first(), 1, {
        directionalRotation: {
          rotation: "-135_ccw"
        },
        y: posY,
        force3D: true,
        transformOrigin: "50% 50%",
        ease: Expo.easeInOut
      }, burgerDelay + 0);
      this.burgerTl.to($lines.last(), 1, {
        directionalRotation: {
          rotation: "135_cw"
        },
        y: -posY,
        force3D: true,
        transformOrigin: "50% 50%",
        ease: Expo.easeInOut
      }, burgerDelay + 0);
      this.burgerTl.to($lines[1], 1, {
        scaleX: 0,
        force3D: true,
        transformOrigin: "50% 50%",
        ease: Expo.easeInOut
      }, burgerDelay + 0);
      this.burgerTl.to($menuTxt, 0.8, {
        y: -20,
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 50% -30px",
        force3D: true,
        ease: Expo.easeInOut
      }, burgerDelay + 0);
      this.burgerTl.pause(0);
      this.stateTl = new TimelineMax();
      this.stateTl.to($menuBtn, 1, {
        color: "#000",
        force3D: true,
        ease: Power2.easeInOut
      }, 0);
      this.stateTl.to($lines, 1, {
        backgroundColor: "#000",
        force3D: true,
        ease: Power2.easeInOut
      }, 0);
      this.stateTl.to($logoPath, 1, {
        fill: "#000",
        force3D: true,
        ease: Power2.easeInOut
      }, 0);
      this.stateTl.to($langContainer, 1, {
        color: "#000",
        force3D: true,
        ease: Power2.easeInOut
      }, 0);
      this.stateTl.to($langContainerAA, 1, {
        color: "#000",
        force3D: true,
        ease: Power2.easeInOut
      }, 0);
      this.stateTl.pause(0);
      $contact = this.element.find("li#contact");
      $contact.on("click", function(e) {
        e.preventDefault();
        Signal.contactClicked.dispatch();
        _this.closeMenu();
      });
      $menuBtn.on("click", this.onMenuClicked);
      Signal.onRouteChanged.add(this.onRouteChanged);
      this.onRouteChanged();
      this.onResize();
      this.menuContainer.css({
        "display": "none"
      });
      TweenMax.fromTo(this.element, 1, {
        opacity: 0,
        y: -100
      }, {
        opacity: 1,
        y: 0,
        force3D: true,
        ease: Expo.easeInOut
      });
    };

    Header.prototype.onRouteChanged = function() {
      var $background;
      $background = this.element.find(".background");
      if (this.menuIsOpened) {
        this.closeMenu();
        this.menuIsOpened = false;
      }
      if (Model.newHash === "home") {
        this.stateTl.reverse();
      } else {
        this.stateTl.play();
      }
      this.resetLiHightlight();
      this.hightlightLi();
    };

    Header.prototype.resetLiHightlight = function() {
      var li, _i, _len, _ref;
      _ref = this.menuLi;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        li = _ref[_i];
        li.classList.remove("mouse-over");
        li.classList.remove("active");
      }
    };

    Header.prototype.hightlightLi = function() {
      var id, li, _i, _len, _ref;
      _ref = this.menuLi;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        li = _ref[_i];
        id = li.id;
        if (id === Model.newHash) {
          li.classList.add("mouse-over");
          li.classList.add("active");
          break;
        }
      }
    };

    Header.prototype.onMenuClicked = function(e) {
      e.preventDefault();
      this.toggleMenu();
    };

    Header.prototype.toggleMenu = function() {
      if (this.menuIsOpened) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    };

    Header.prototype.openMenu = function() {
      this.menuContainer.css({
        "display": "block"
      });
      this.onResize();
      this.menuIsOpened = true;
      this.menuTl.timeScale(1.2).play();
      this.stateTl.timeScale(1.2).play();
      this.burgerTl.timeScale(1).play();
      this.element.on("mouseenter", this.menuContainerMouseEnter);
      this.element.on("mouseleave", this.menuContainerMouseLeft);
    };

    Header.prototype.closeMenu = function() {
      TweenMax.killDelayedCallsTo(this.closeMenu);
      this.element.off("mouseleave", this.menuContainerMouseLeft);
      this.element.off("mouseenter", this.menuContainerMouseEnter);
      this.menuIsOpened = false;
      this.menuTl.timeScale(1.6).reverse();
      if (Model.newHash === "home") {
        this.stateTl.timeScale(1.6).reverse();
      }
      this.burgerTl.timeScale(1.4).reverse();
    };

    Header.prototype.menuContainerMouseLeft = function(e) {
      e.preventDefault();
      TweenMax.killDelayedCallsTo(this.closeMenu);
      TweenMax.delayedCall(this.menuOpenTime, this.closeMenu);
    };

    Header.prototype.menuContainerMouseEnter = function(e) {
      e.preventDefault();
      TweenMax.killDelayedCallsTo(this.closeMenu);
    };

    Header.prototype.onMenuReverseComplete = function() {
      this.menuContainer.css({
        "display": "none"
      });
    };

    Header.prototype.onResize = function() {
      var linkMenuCss, shareMenuCss;
      linkMenuCss = {
        left: (Model.windowW >> 1) - (this.linkMenu.width() >> 1)
      };
      shareMenuCss = {
        left: (Model.windowW >> 1) - (this.shareMenu.outerWidth(true) >> 1) - 10
      };
      this.linkMenu.css(linkMenuCss);
      this.shareMenu.css(shareMenuCss);
    };

    return Header;

  })(View);
  return Header;
});
