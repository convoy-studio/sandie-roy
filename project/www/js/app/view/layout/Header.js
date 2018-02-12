var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["View"], function(View) {
  "use strict";
  var Header;
  Header = (function() {
    class Header extends View {
      constructor(id, scope) {
        var i, j, k, l, len, menu, page, previews, ref, share, v;
        scope = {};
        scope.logo = Loader.getSvg("logo");
        scope.fr = Model.content.fr;
        scope.en = Model.content.en;
        scope.menuBtnTxt = Model.content.menu;
        scope.isDesktop = Model.isDesktop;
        previews = Model.routing.slice(0, Model.routing.length - 1);
        menu = [];
        for (j = 0, len = previews.length; j < len; j++) {
          page = previews[j];
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
        ref = Model.content.social;
        for (k in ref) {
          v = ref[k];
          v.id = Util.ConvertToSlug(v.name);
          v.name = Util.CapitalizeFirstLetter(v.name);
          v.btnMode = i === 0 ? false : true;
          share.push(v);
          i += 1;
        }
        scope.share = share;
        super(id, scope);
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        this.onRouteChanged = this.onRouteChanged.bind(this);
        this.resetLiHightlight = this.resetLiHightlight.bind(this);
        this.hightlightLi = this.hightlightLi.bind(this);
        this.onMenuClicked = this.onMenuClicked.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.menuContainerMouseLeft = this.menuContainerMouseLeft.bind(this);
        this.menuContainerMouseEnter = this.menuContainerMouseEnter.bind(this);
        this.onMenuReverseComplete = this.onMenuReverseComplete.bind(this);
        this.onResize = this.onResize.bind(this);
      }

      init() {
        boundMethodCheck(this, Header);
        this.menuIsOpened = false;
        Signal.onResize.add(this.onResize);
        TweenMax.delayedCall(0.1, this.ready);
      }

      ready() {
        var $background, $contact, $langContainer, $langContainerAA, $lines, $linksName, $linksSeparator, $logoPath, $menuBtn, $menuTxt, $sharerName, backgroundH, burgerDelay, delay, posY;
        boundMethodCheck(this, Header);
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
        if (Model.isDesktop) {
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
        } else {
          this.menuTl.from($background, 1, {
            y: -backgroundH,
            force3D: true,
            ease: Expo.easeInOut
          }, 0);
          this.menuTl.staggerFrom($linksName, 1, {
            opacity: 0,
            ease: Power2.easeInOut
          }, 0.02, delay + 0.1);
          this.menuTl.staggerFrom($linksSeparator, 1, {
            opacity: 0,
            ease: Power2.easeInOut
          }, 0.02, delay + 0.1);
          this.menuTl.staggerFrom($sharerName, 1, {
            opacity: 0,
            ease: Power2.easeInOut
          }, 0.02, delay + 0.1);
        }
        this.menuTl.pause(0);
        burgerDelay = 0.1;
        posY = 8;
        this.burgerTl = new TimelineMax();
        if (Model.isDesktop) {
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
        } else {
          // @burgerTl.to $lines.first(), 1, { ease:Expo.easeInOut }, burgerDelay + 0
          // @burgerTl.to $lines.last(), 1, {  ease:Expo.easeInOut }, burgerDelay + 0
          // @burgerTl.to $lines[1], 1, { scaleX:0, force3D:true, transformOrigin: "50% 50%", ease:Expo.easeInOut }, burgerDelay + 0
          this.burgerTl.to($menuTxt, 0.8, {
            opacity: 0,
            ease: Expo.easeInOut
          }, burgerDelay + 0);
        }
        this.burgerTl.pause(0);
        this.stateTl = new TimelineMax();
        this.stateTl.to($menuBtn, 1, {
          color: "#000",
          ease: Power2.easeInOut
        }, 0);
        this.stateTl.to($lines, 1, {
          backgroundColor: "#000",
          ease: Power2.easeInOut
        }, 0);
        this.stateTl.to($logoPath, 1, {
          fill: "#000",
          ease: Power2.easeInOut
        }, 0);
        this.stateTl.to($langContainer, 1, {
          color: "#000",
          ease: Power2.easeInOut
        }, 0);
        this.stateTl.to($langContainerAA, 1, {
          color: "#000",
          ease: Power2.easeInOut
        }, 0);
        this.stateTl.pause(0);
        $contact = this.element.find("li#contact");
        $contact.on("click", (e) => {
          e.preventDefault();
          Signal.contactClicked.dispatch();
          this.closeMenu();
        });
        $menuBtn.on("click", this.onMenuClicked);
        Signal.onRouteChanged.add(this.onRouteChanged);
        this.onRouteChanged();
        this.onResize();
        this.menuContainer.css({
          "display": "none"
        });
        TweenMax.fromTo(this.element, 1, {
          opacity: 0
        }, {
          opacity: 1,
          ease: Expo.easeInOut
        });
      }

      onRouteChanged() {
        var $background;
        boundMethodCheck(this, Header);
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
      }

      resetLiHightlight() {
        var j, len, li, ref;
        boundMethodCheck(this, Header);
        ref = this.menuLi;
        for (j = 0, len = ref.length; j < len; j++) {
          li = ref[j];
          li.classList.remove("mouse-over");
          li.classList.remove("active");
        }
      }

      hightlightLi() {
        var id, j, len, li, ref;
        boundMethodCheck(this, Header);
        ref = this.menuLi;
        for (j = 0, len = ref.length; j < len; j++) {
          li = ref[j];
          id = li.id;
          if (id === Model.newHash) {
            li.classList.add("mouse-over");
            li.classList.add("active");
            break;
          }
        }
      }

      onMenuClicked(e) {
        boundMethodCheck(this, Header);
        e.preventDefault();
        this.toggleMenu();
      }

      toggleMenu() {
        boundMethodCheck(this, Header);
        if (this.menuIsOpened) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      }

      openMenu() {
        boundMethodCheck(this, Header);
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
      }

      closeMenu() {
        boundMethodCheck(this, Header);
        TweenMax.killDelayedCallsTo(this.closeMenu);
        this.element.off("mouseleave", this.menuContainerMouseLeft);
        this.element.off("mouseenter", this.menuContainerMouseEnter);
        this.menuIsOpened = false;
        this.menuTl.timeScale(1.6).reverse();
        if (Model.newHash === "home") {
          this.stateTl.timeScale(1.6).reverse();
        }
        this.burgerTl.timeScale(1.4).reverse();
      }

      menuContainerMouseLeft(e) {
        boundMethodCheck(this, Header);
        e.preventDefault();
        TweenMax.killDelayedCallsTo(this.closeMenu);
        TweenMax.delayedCall(this.menuOpenTime, this.closeMenu);
      }

      menuContainerMouseEnter(e) {
        boundMethodCheck(this, Header);
        e.preventDefault();
        TweenMax.killDelayedCallsTo(this.closeMenu);
      }

      onMenuReverseComplete() {
        boundMethodCheck(this, Header);
        this.menuContainer.css({
          "display": "none"
        });
      }

      onResize() {
        var linkMenuCss, shareMenuCss;
        boundMethodCheck(this, Header);
        linkMenuCss = {
          left: (Model.windowW >> 1) - (this.linkMenu.width() >> 1)
        };
        shareMenuCss = {
          left: (Model.windowW >> 1) - (this.shareMenu.outerWidth(true) >> 1) - 10
        };
        this.linkMenu.css(linkMenuCss);
        this.shareMenu.css(shareMenuCss);
      }

    };

    Header.prototype.menuOpenTime = 2;

    return Header;

  }).call(this);
  return Header;
});
