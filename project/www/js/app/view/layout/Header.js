var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  "use strict";
  var Header;
  Header = (function(_super) {
    __extends(Header, _super);

    function Header(id, scope) {
      this.onResize = __bind(this.onResize, this);
      this.closeMenu = __bind(this.closeMenu, this);
      this.openMenu = __bind(this.openMenu, this);
      this.toggleMenu = __bind(this.toggleMenu, this);
      this.onMenuClicked = __bind(this.onMenuClicked, this);
      this.onHomePage = __bind(this.onHomePage, this);
      this.onRouteChanged = __bind(this.onRouteChanged, this);
      this.onPartPageTransitionOut = __bind(this.onPartPageTransitionOut, this);
      this.onPartPageTransitionInCompleted = __bind(this.onPartPageTransitionInCompleted, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      var k, l, menu, page, share, v, _i, _len, _ref, _ref1;
      scope = {};
      scope.logo = Loader.getSvg("logo");
      scope.fr = Model.content.fr;
      scope.en = Model.content.en;
      scope.menuBtnTxt = Model.content.menu;
      menu = [];
      _ref = Model.routing;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        page = _ref[_i];
        l = {};
        l.id = page.id;
        l.name = page.scope.title;
        l.isLast = false;
        menu.push(l);
      }
      menu[menu.length - 1].isLast = true;
      scope.menu = menu;
      share = [];
      _ref1 = Model.content.social;
      for (k in _ref1) {
        v = _ref1[k];
        v.name = Util.CapitalizeFirstLetter(v.name);
        share.push(v);
      }
      scope.share = share;
      Header.__super__.constructor.call(this, id, scope);
    }

    Header.prototype.init = function() {
      this.menuIsOpened = false;
      Signal.onResize.add(this.onResize);
      Signal.onPartPageTransitionInCompleted.add(this.onPartPageTransitionInCompleted);
      Signal.onPartPageTransitionOut.add(this.onPartPageTransitionOut);
      Signal.onRouteChanged.add(this.onRouteChanged);
      Signal.onHomePage.add(this.onHomePage);
      TweenMax.delayedCall(0.1, this.ready);
    };

    Header.prototype.ready = function() {
      var $background, $langContainer, $lines, $linksName, $linksSeparator, $logoPath, $menuBtn, $menuTxt, $sharerName, backgroundH, burgerDelay, delay, posY;
      CSSPlugin.defaultTransformPerspective = 600;
      this.linkMenu = this.element.find("ul.link-menu");
      this.shareMenu = this.element.find("ul.share-menu");
      $menuBtn = this.element.find(".menu-btn");
      $background = this.element.find(".background");
      $lines = this.element.find(".line");
      $logoPath = this.element.find(".logo svg path");
      $langContainer = this.element.find(".lang-container");
      $menuTxt = $menuBtn.find(".menu-txt");
      $linksName = Util.TranformArrayFromMiddleAndOut(this.element.find(".link-menu .name"));
      $linksSeparator = Util.TranformArrayFromMiddleAndOut(this.element.find(".link-menu .separator"));
      $sharerName = Util.TranformArrayFromMiddleAndOut(this.element.find(".share-menu .name"));
      backgroundH = $background.height();
      delay = 0.1;
      this.menuTl = new TimelineMax();
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
      this.stateTl.pause(0);
      $menuBtn.on("click", this.onMenuClicked);
      this.onResize();
    };

    Header.prototype.onPartPageTransitionInCompleted = function() {
      this.stateTl.play();
    };

    Header.prototype.onPartPageTransitionOut = function() {};

    Header.prototype.onRouteChanged = function() {
      if (this.menuIsOpened) {
        this.closeMenu();
        this.menuIsOpened = false;
      }
    };

    Header.prototype.onHomePage = function() {
      if (this.menuIsOpened) {
        this.closeMenu();
        this.menuIsOpened = false;
      } else {
        if (this.stateTl != null) {
          this.stateTl.timeScale(1.6).reverse();
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
        this.menuIsOpened = false;
      } else {
        this.openMenu();
        this.menuIsOpened = true;
      }
    };

    Header.prototype.openMenu = function() {
      this.menuTl.timeScale(1.2).play();
      this.stateTl.timeScale(1.2).play();
      this.burgerTl.timeScale(1).play();
    };

    Header.prototype.closeMenu = function() {
      this.menuTl.timeScale(1.6).reverse();
      console.log(Model.newHash, "close menu");
      if (Model.newHash === "home") {
        this.stateTl.timeScale(1.6).reverse();
      }
      this.burgerTl.timeScale(1.4).reverse();
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
